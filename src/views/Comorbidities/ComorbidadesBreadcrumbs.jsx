import React from 'react'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs';

const ComorbidadesBreadcrumbs = () => (
  <CustomBreadcrumbs
    links={[
      { label: 'Meus pacientes', route: '/meus-pacientes' },
      { label: 'Categorias', route: '/categorias' },
      {
        label: 'Comorbidades / Condições clínicas de base',
        route: '/categorias/comorbidades',
      },
    ]}
  />
)

export default ComorbidadesBreadcrumbs