import React from 'react';
import { Router } from 'react-router-dom';
import CustomBreadCrumbs from './CustomBreadcrumbs';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';

test('Renderiza links no breadcrumb', async () => {
  const history = createMemoryHistory();

  const mockLinks = [
    { label: 'Meus pacientes', route: '/meus-pacientes' },
    { label: 'Categorias', route: '/categorias' },
    { label: 'Exame Físico', route: '/categorias/exame-fisico' },
  ];
  render(
    <Router history={history}>
      <CustomBreadCrumbs links={mockLinks} />
    </Router>,
  );

  await waitFor(() => screen.getByLabelText('breadcrumb'));

  expect(screen.getByLabelText('breadcrumb')).toHaveTextContent(
    'Meus pacientes',
  );
  expect(screen.getByLabelText('breadcrumb')).toHaveTextContent('Categorias');
  expect(screen.getByLabelText('breadcrumb')).toHaveTextContent('Exame Físico');
});
