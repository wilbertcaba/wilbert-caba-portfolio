type LexicalIframeProps = {
    url?: string | null;
    title?: string | null;
    height?: number | null;
};

export function LexicalIframe({ url, title, height }: LexicalIframeProps) {
    const src = url?.trim();
    if (!src) return null;

    return (
        <iframe
            allowFullScreen
            className="my-6 w-full rounded-xl border-0"
            height={height && height > 0 ? height : 400}
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            src={src}
            title={title?.trim() || "Embedded content"}
        />
    );
}
