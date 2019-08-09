import classnames from 'classnames';

export default props => {
  const { name, type, className = '', ..._Props } = props;
  const xlinkHref = `#icon${name || type}`;
  return (
    <svg
      {..._Props}
      className={classnames(['icon', className])}
      aria-hidden="true"
    >
      <use xlinkHref={xlinkHref} />
    </svg>
  );
};