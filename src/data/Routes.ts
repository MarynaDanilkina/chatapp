export enum ROUTES {
  MAIN = '/',
  CREATE = 'create',
  EDIT = 'edit',
}
export const routes = {
  main: `/${ROUTES.MAIN}`,
  create: `/${ROUTES.CREATE}`,
  edit: `/${ROUTES.EDIT}/:id`,
};
