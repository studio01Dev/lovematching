import './queue.css';

export function QueueCountBadge({ isLoading, count }) {
    if (isLoading) {
        return (
            <span className="queue-count-loading h6 sb brand500">
                계산 중
                <span className="queue-count-dots" aria-hidden="true">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </span>
            </span>
        );
    }

    return <div className="h6 sb brand500">{count}</div>;
}

export function QueueCountText({ isLoading, loadingText, children }) {
    if (isLoading) {
        return <>{loadingText}</>;
    }

    return <>{children}</>;
}
