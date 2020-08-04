import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Link as MuiLink,
  Breadcrumbs,
} from '@material-ui/core';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const CustonBreadcrumbs = props => {

  const { links } = props;

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
    >
      {links.map((link, index) => (
        <MuiLink
          color={links.length === index + 1 ? 'textPrimary' : 'inherit'}
          component={Link}
          key={index}
          to={link.route}
        >
          {link.label}
        </MuiLink>
      ))}
    </Breadcrumbs >
  );
}

CustonBreadcrumbs.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired
    })
  ).isRequired
};

export default CustonBreadcrumbs;
