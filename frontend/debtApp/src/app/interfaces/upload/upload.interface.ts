export interface UploadItemInterface {
    id?:number;
    file_name: string;
    file_path: string;
    status: UploadStatusType
    created_at: Date
    updated_at: Date
}

export type UploadStatusType = 'U'|'Q'|'P'|'F'|'E';

export enum UploadStatusEnum {
    'U'="Enviado",
    'Q'="Na fila",
    'P'="Processando",
    'F'="Finalizado",
    'E'="Erro"
}
