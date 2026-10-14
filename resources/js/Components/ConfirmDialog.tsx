import DangerButton from './DangerButton';
import Modal from './Modal';
import SecondaryButton from './SecondaryButton';

interface Props {
    show: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({
    show,
    title,
    message,
    confirmLabel = 'Delete',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
}: Props) {
    return (
        <Modal show={show} onClose={onCancel} maxWidth="md">
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {title}
                </h2>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {message}
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <SecondaryButton onClick={onCancel}>
                        {cancelLabel}
                    </SecondaryButton>

                    <DangerButton onClick={onConfirm}>
                        {confirmLabel}
                    </DangerButton>
                </div>
            </div>
        </Modal>
    );
}
