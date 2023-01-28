import React from 'react';

export default (value, delay) => {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(
        () => {
            const timeout = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(timeout);
            };
        },
        Array.isArray(value) ? value : [value]
    );

    return debouncedValue;
};