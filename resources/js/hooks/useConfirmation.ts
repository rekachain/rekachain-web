export const useConfirmation = async () => {
    return await window.Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: 'This action is irreversible',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    });
};
