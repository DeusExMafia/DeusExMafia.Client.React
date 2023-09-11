import React, { Component, HTMLAttributes, ReactNode } from "react";
import DeusExMafiaClient from "../../DeusExMafiaClient";
import Lobby from "../../lobby/Lobby";
import SendChatMessageServerBoundPacket from "../../network/packet/serverbound/SendChatMessageServerBoundPacket";
import StringUtil from "../../util/StringUtil";
import "./ChatBoxComponent.css";
import ChatMessageComponent from "./ChatMessageComponent";

interface Props extends HTMLAttributes<HTMLDivElement> {
    client: DeusExMafiaClient;
    lobby: Lobby;
}

interface State {
    input: string;
    messages: string[];
}

export default class ChatBoxComponent extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        props.lobby.onChatMessage.chat = (e) => this.addMessage(e.message);
        this.state = {
            input: "",
            messages: []
        };
    }

    public render(): ReactNode {
        return (
            <div className={`chat-box ${this.props.className || ""}`}>
                <div className="chat-messages">{this.state.messages.map((message, index) => <ChatMessageComponent key={`chatMessage${index}`} message={message} />)}</div>
                <div className="chat-input">
                    <input type="text" value={this.state.input} onKeyDown={e => this.trySend(e)} onChange={e => this.updateMessage(e.target.value)} />
                    <button onClick={() => this.sendMessage()}>Send Message</button>
                </div>
            </div>
        );
    }

    private updateMessage(message: string): void {
        this.setState({
            input: message
        });
    }

    private sendMessage(): void {
        if (StringUtil.isNullOrWhitespace(this.state.input)) {
            return;
        }
        let packet: SendChatMessageServerBoundPacket = new SendChatMessageServerBoundPacket(this.state.input);
        this.props.client.clientConnection?.sendPacket(packet);
        this.updateMessage("");
    }

    private trySend(e: React.KeyboardEvent<HTMLInputElement>): void {
        if (e.key === "Enter") {
            this.sendMessage();
        }
    }

    private addMessage(message: string): void {
        this.state.messages.push(message);
    }
}
