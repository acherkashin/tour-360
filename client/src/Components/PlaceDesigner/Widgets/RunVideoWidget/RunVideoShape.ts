import PropTypes from 'prop-types';

export default PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    muted: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
});
