import { IHeader } from '~/types/Entity';

export interface bodyDataSendMessageTemplate {
    code: string;
    phone: string;
    headerUrl?: string;
    parameters: string[];
    buttonUrl?: string;
    language?: string;
}

export interface bodyDataUploads {
    name: string;
    mime: string;
}

export interface bodyDataTemplate {
    name: string;
    code: string;
    type: string;
    body: string;
    parameters: string[];
    header: IHeader;
    footer: string;
    button: bodyDataButton;
}

export interface bodyDataButton {
    url?: bodyDataButtonParameters;
}

export interface bodyDataButtonParameters {
    text: string;
    link: string;
}
