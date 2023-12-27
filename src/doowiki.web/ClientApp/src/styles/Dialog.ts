export default {
    overlay:{
        backgroundColor: 'rgb(248, 248, 248, 0.4)',
        position: 'fixed',
        inset: 0,
        animation: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)'
    },
    content:{
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw',
        maxWidth: '450px',
        maxHeight: '85vh',
        padding: '25px',
        animation: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)'
    }
}