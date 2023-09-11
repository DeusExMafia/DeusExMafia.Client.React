import { Component, HTMLAttributes, ReactNode } from "react";

interface Props {
    message: string;
}

export default class ChatMessageComponent extends Component<HTMLAttributes<HTMLDivElement> & Props> {
    public render(): ReactNode {
        return (
            <div>{this.props.message}</div>
        );
    }
}
