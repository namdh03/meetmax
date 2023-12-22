import { useEffect, useRef } from "react";

interface InfiniteScrollProps {
    children: JSX.Element;
    loader?: JSX.Element;
    fetchMore?: () => void;
    hasMore?: boolean;
    endMessage?: JSX.Element;
}

const InfiniteScroll = ({
    children,
    loader,
    fetchMore,
    hasMore,
    endMessage,
}: InfiniteScrollProps) => {
    const pageStartRef = useRef(null);

    useEffect(() => {
        if (hasMore) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        fetchMore && fetchMore();
                    }
                },
                {
                    root: null,
                    rootMargin: "0px",
                    threshold: 1.0,
                }
            );

            const currentRef = pageStartRef.current;

            if (currentRef) {
                observer.observe(currentRef);
            }

            return () => {
                if (currentRef) {
                    observer.unobserve(currentRef);
                }
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasMore]);

    return (
        <>
            <div ref={pageStartRef}>{loader}</div>

            {children}

            {hasMore ? null : endMessage}
        </>
    );
};

export default InfiniteScroll;
