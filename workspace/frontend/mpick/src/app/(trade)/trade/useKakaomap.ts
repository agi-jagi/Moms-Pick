const useKakaomap = () => {
  const settingRadius = (circle: any, radius: number) => {
    circle.setRadius(radius);
  };

  return { settingRadius };
};

export default useKakaomap;
