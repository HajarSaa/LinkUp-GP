import PropTypes from 'prop-types';

function FullPageContent({children}) {
  return (
    <div>
      {children}
    </div>
  );
}

FullPageContent.propTypes = {
  children:PropTypes.any,
}

export default FullPageContent;