import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';

// This component is a simple wrapper around NextLink that forwards props.
// It's used by the main Link component.
const NextLinkComposed = React.forwardRef(function NextLinkComposed(props, ref) {
    const { to, linkAs, replace, scroll, shallow, prefetch, locale, ...other } = props;

    return (
        <NextLink
            href={to}
            prefetch={prefetch}
            as={linkAs}
            replace={replace}
            scroll={scroll}
            shallow={shallow}
            locale={locale}
            passHref
            ref={ref}
            {...other}
        />
    );
});

NextLinkComposed.propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    linkAs: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    replace: PropTypes.bool,
    scroll: PropTypes.bool,
    shallow: PropTypes.bool,
    prefetch: PropTypes.bool,
    locale: PropTypes.string,
};

// The main Link component that you'll use throughout your app.
const Link = React.forwardRef(function Link(props, ref) {
    const {
        activeClassName = 'active',
        as,
        className: classNameProps,
        href,
        ...other
    } = props;

    const router = useRouter();
    const pathname = typeof href === 'string' ? href : href.pathname;
    const className = clsx(classNameProps, {
        [activeClassName]: router.pathname === pathname && activeClassName,
    });

    const isExternal =
        typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

    if (isExternal) {
        return <MuiLink className={className} href={href} ref={ref} {...other} />;
    }

    return (
        <MuiLink
            component={NextLink}
            href={href}
            as={as}
            className={className}
            ref={ref}
            {...other}
        />
    );
});

Link.propTypes = {
    activeClassName: PropTypes.string,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    className: PropTypes.string,
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default Link;