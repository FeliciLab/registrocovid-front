import React from 'react';
import { CustomBreadcrumbs } from 'components';

function PhysicalExamsListBreadcrumbs() {
  return (
    <CustomBreadcrumbs
      links={[
        { label: 'Meus pacientes', route: '/meus-pacientes' },
        { label: 'Categorias', route: '/categorias' },
        {
          label: 'Lista de evoluções',
          route: '/categorias/lista-exame-fisico',
        },
      ]}
    />
  );
}

export default PhysicalExamsListBreadcrumbs;
