import Image from 'next/image';
import styles from './MDXImage.module.css';

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;

function toNumber(value, fallback) {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function MDXImage({
    alt = '',
    caption,
    className = '',
    height,
    priority = false,
    sizes = '(max-width: 820px) 100vw, 820px',
    src,
    width,
    ...props
}) {
    if (!src) {
        return null;
    }

    const resolvedWidth = toNumber(width, DEFAULT_WIDTH);
    const resolvedHeight = toNumber(height, DEFAULT_HEIGHT);
    const imageClassName = className ? `${styles.image} ${className}` : styles.image;

    return (
        <figure className={styles.figure}>
            <Image
                alt={alt}
                className={imageClassName}
                height={resolvedHeight}
                priority={priority}
                sizes={sizes}
                src={src}
                width={resolvedWidth}
                {...props}
            />
            {(caption || alt) && <figcaption className={styles.caption}>{caption || alt}</figcaption>}
        </figure>
    );
}

export function MDXInlineImage({ alt = '', src, ...props }) {
    if (!src) {
        return null;
    }

    return <img alt={alt} className={styles.image} loading="lazy" src={src} {...props} />;
}
