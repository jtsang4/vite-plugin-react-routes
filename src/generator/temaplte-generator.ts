export function generateCodeByImportAndRouteCode(
  importCode: string,
  routeCode: string,
): string {
  return `
import React, { FC } from 'react';
import { HashRouter, BrowserRouter, useRoutes } from 'react-router-dom';
${importCode}

const InnerRoutes: FC = () => {
  const element = useRoutes(${routeCode});

  return element;
};

type RouterProps = {
  mode?: 'hash' | 'browser';
};

const ReactRouter: FC<RouterProps> = ({ mode = 'hash' }) => {
  if (mode === 'hash') {
    return (
      <HashRouter>
        <InnerRoutes />
      </HashRouter>
    );
  }
  return (
    <BrowserRouter>
      <InnerRoutes />
    </BrowserRouter>
  );
};

export default ReactRouter;
`
}
