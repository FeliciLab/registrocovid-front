import { CustomBreadcrumbs } from 'components';
import React from 'react';

function PhysicalExamBreadcrumbs() {
  return (
    <CustomBreadcrumbs
      links={[
        { label: 'Meus pacientes', route: '/meus-pacientes' },
        { label: 'Categorias', route: '/categorias' },
        {
          label: 'Lista de evoluções',
          route: '/categorias/lista-exame-fisico',
        },
        { label: 'Exame Físico', route: '/categorias/exame-fisico' },
      ]}
    />
  );
}

export default PhysicalExamBreadcrumbs;
