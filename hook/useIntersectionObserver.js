import {useEffect, useState} from 'react'


function useIntersectionObserver(elementRef,
                                 {
                                     threshold = 0,
                                     root = null,
                                     rootMargin = '0%',
                                     freezeOnceVisible = false,
                                 }) {
    const [entry, setEntry] = useState(null)

    const frozen = entry?.isIntersecting && freezeOnceVisible

    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
        setEntry(entry)
    }

    useEffect(() => {
        const node = elementRef?.current // DOM Ref
        const hasIOSupport = !!window.IntersectionObserver

        if (!hasIOSupport || frozen || !node) return

        const observerParams = { threshold, root, rootMargin }
        const observer = new IntersectionObserver(updateEntry, observerParams)
        observer.observe(node)

        return () => observer.disconnect()
    }, [elementRef, threshold, frozen, root, rootMargin])

    return entry;
}

export default useIntersectionObserver
