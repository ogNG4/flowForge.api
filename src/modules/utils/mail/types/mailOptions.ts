export type mailOptions = {
    to: string;
    subject: string;
    template?: string;
    html?: string;
    context: Record<string, unknown>;
};
