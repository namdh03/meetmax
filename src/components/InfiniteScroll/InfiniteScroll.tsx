import { useEffect, useRef } from "react";

import { InfiniteScrollProps } from "@/types";

const InfiniteScroll = ({
    children,
    hasMore,
    fetchMore,
    loader,
    endMessage,
    reverse,
}: InfiniteScrollProps) => {
    const pageRef = useRef(null);

    useEffect(() => {
        if (hasMore) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    fetchMore && fetchMore();
                }
            });

            const currentRef = pageRef.current;

            if (currentRef) {
                observer.observe(currentRef);
            }

            return () => {
                if (currentRef) {
                    observer.unobserve(currentRef);
                }
            };
        }
    }, [fetchMore, hasMore]);

    const renderHasMore = () =>
        hasMore ? <div ref={pageRef}>{loader}</div> : endMessage;

    return (
        <>
            {reverse && renderHasMore()}

            {children}

            {!reverse && renderHasMore()}
        </>
    );
};

export default InfiniteScroll;
