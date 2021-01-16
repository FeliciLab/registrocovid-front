import React from 'react';
import { CustomBreadcrumbs } from 'components';

const DailyEvolutionBreadcrumbs = (props) => {
  const { id } = props;
  return (
    <CustomBreadcrumbs
      links={[
        { label: 'Meus pacientes', route: '/meus-pacientes' },
        { label: 'Categorias', route: '/categorias' },
        {
          label: 'Lista de evoluções',
          route: '/categorias/evolucao-diaria-list',
        },
        {
          label: 'Evolução diária',
          route: `/categorias/evolucao-diaria/${id}`,
        },
      ]}
    />
  );
}

export default DailyEvolutionBreadcrumbs;