import PropTypes from 'prop-types';

function FullPageContent({children}) {
  return (
    <>
      {children}
    </>
  );
}

FullPageContent.propTypes = {
  children:PropTypes.any,
}

export default FullPageContent;