import React, { useState, useRef, useEffect } from "react";

const SmoothDescription = ({ description }) => {
    const [expanded, setExpanded] = useState(false);
    const [height, setHeight] = useState("3rem");
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            setHeight(expanded ? `${ref.current.scrollHeight}px` : "3rem");
        }
    }, [expanded]);

    return (
        <div
            style={{ height }}
            className="overflow-hidden transition-all duration-500 ease-in-out mt-3 max-w-md"
        >
            <p
                ref={ref}
                className={`text-gray-200 text-sm ${expanded ? "" : "line-clamp-2"
                    }`}
            >
                {expanded ? description : description.slice(0, 90)}
                {description.length > 90 && (
                    <span
                        onClick={() => setExpanded(!expanded)}
                        className="text-gray-400 cursor-pointer ml-2"
                    >
                        {expanded ? " Show less" : "... Show more"}
                    </span>
                )}
            </p>
        </div>
    );
};

export default SmoothDescription;
