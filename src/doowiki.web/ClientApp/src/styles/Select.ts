export default {
    trigger: {
        all: 'unset',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        padding: '0 5px',
        backgroundColor: '$brown3',
        color: 'black',
        '&:hover': { backgroundColor: 'mauve' },
        '&:focus': { boxShadow: `0 0 0 2px black` },
        '&[data-placeholder]': { color: 'violet' },
    },
    content: {
        overflow: 'hidden',
        backgroundColor: '$brown5',
        boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)'
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 35px 0 25px',
        position: 'relative',
        userSelect: 'none',
        color: 'black',

        '&[data-disabled]': {
            color: 'mauve',
            pointerEvents: 'none',
        },

        '&[data-highlighted]': {
            outline: 'none',
            backgroundColor: 'violet',
            color: 'violet',
        },
    },
    viewport: {
        padding: '5px'
    }    
}