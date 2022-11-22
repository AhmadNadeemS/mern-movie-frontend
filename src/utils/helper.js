const isEmailValid = (email) => {
  const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return isValid.test(email);
};

export default isEmailValid;

export const renderItem = ({ id, name, avatar }) => {
  return (
    <div className="flex space-x-2 rounded overflow-hidden" key={id}>
      <img className="w-16 h-16 object-cover" src={avatar} alt="av" />
      <p className="font-semibold">{name}</p>
    </div>
  );
};

export const getPosters = (posters = []) => {
  const { length } = posters;
  if (!length) return null;
  if (length > 2) return posters[1];
  return posters[0];
};

export const convertReviewCount = (count = 0) => {
  if (count <= 999) return count;
  return parseFloat(count / 1000).toFixed(2) + "k";
};
