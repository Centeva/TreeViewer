export class ModalData {
  active: boolean = true;
  canClose: boolean = true;
  component: any = null;
  IO: { [key: string]: any };
  header: string = '';

  constructor(fields: Partial<ModalData> = {}) {
    Object.assign(this, fields);
  }
}
