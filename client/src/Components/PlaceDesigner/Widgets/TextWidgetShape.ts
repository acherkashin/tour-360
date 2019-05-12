import PropTypes from 'prop-types';

export default PropTypes.shape<any>({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    padding: PropTypes.number,
});
