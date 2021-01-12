import React from 'react';
import { CustomBreadcrumbs } from 'components';

const DailyEvolutionListBreadcrumbs = () => {
  return (
    <CustomBreadcrumbs
      links={[
        { label: 'Meus pacientes', route: '/meus-pacientes' },
        { label: 'Categorias', route: '/categorias' },
        {
          label: 'Lista de evoluções',
          route: '/categorias/evolucao-diaria-list/',
        },
      ]}
    />
  );
}

export default DailyEvolutionListBreadcrumbs;