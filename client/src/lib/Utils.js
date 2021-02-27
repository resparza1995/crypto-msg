import { Modal } from 'antd';

export function showErrorModal(title, content) {
    Modal.error({
        title: title,
        content: content,
    });
}

export function showSuccesModal(content) {
    Modal.success({
        content: content,
    });
}

export function showInfoModal(title, content) {
    Modal.info({
        title: title,
        content: content,
        onOk() { },
    });
}