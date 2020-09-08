function solutionMatrix(index) {
  var returnMatrix;
  switch (index) {
    case 0:
      let world0 = utils.MakeWorld(0.0, 0.0, 0.0, 0.0, 90.0, 0.0, 1.0);
      let afterTrans0 = utils.multiplyMatrices(utils.MakeTranslateMatrix(1.0, 2.0, 0.0), world0)
      returnMatrix = utils.multiplyMatrices(
        utils.MakeWorld(selectedTarget.translations[0][0], selectedTarget.translations[0][1], selectedTarget.translations[0][2], 0.0, 0.0, selectedTarget.rotation[0], 1.0),
        afterTrans0)
      break;

    case 1:
      let world1 = utils.MakeWorld(0.0, 0.0, 0.0, 90.0, 90.0, 0.0, 1.0);
      let afterTrans1 = utils.multiplyMatrices(utils.MakeTranslateMatrix(1.411592, 0.528053, 0.0), world1)
      returnMatrix = utils.multiplyMatrices(
        utils.MakeWorld(selectedTarget.translations[1][0], selectedTarget.translations[1][1], selectedTarget.translations[1][2], 0.0, 0.0, selectedTarget.rotation[1], 1.0),
        afterTrans1)
      break;

    case 2:
      let world2 = utils.MakeWorld(0.0, 0.0, 0.0, 0.0, 90.0, 0.0, 1.0);
      let afterTrans2 = utils.multiplyMatrices(utils.MakeTranslateMatrix(-0.436478, 0.957322, 0.0), world2)
      returnMatrix = utils.multiplyMatrices(
        utils.MakeWorld(selectedTarget.translations[2][0], selectedTarget.translations[2][1], selectedTarget.translations[2][2], 0.0, 0.0, selectedTarget.rotation[2], 1.0),
        afterTrans2)
      break;

    case 3:
      let world3 = utils.identityMatrix();
      if (!selectedTarget.mirror) {
        world3 = utils.multiplyMatrices(horizontalMirror, utils.identityMatrix());
      }
      world3 = utils.multiplyMatrices(utils.MakeWorld(0.0, 0.0, 0.0, 0.0, 90.0, 0.0, 1.0), world3);
      var transx;
      if (selectedTarget.mirror) {
        transx = 0.56;
      } else {
        transx = -0.41
      }
      let afterTrans3 = utils.multiplyMatrices(utils.MakeTranslateMatrix(transx, 1.617, 0.0), world3)
      returnMatrix = utils.multiplyMatrices(
        utils.MakeWorld(selectedTarget.translations[3][0], selectedTarget.translations[3][1], selectedTarget.translations[3][2], 0.0, 0.0, selectedTarget.rotation[3], 1.0),
        afterTrans3)
      break;

    case 4:
      let world4 = utils.MakeWorld(0.0, 0.0, 0.0, 0.0, 90.0, 0.0, 1.0);
      returnMatrix = utils.multiplyMatrices(
        utils.MakeWorld(selectedTarget.translations[4][0], selectedTarget.translations[4][1], selectedTarget.translations[4][2], 0.0, 0.0, selectedTarget.rotation[4], 1.0),
        world4)
      break

    case 5:
      let world5 = utils.MakeWorld(0.0, 0.0, 0.0, 180.0, 90.0, 0.0, 1.0);
      let afterTrans5 = utils.multiplyMatrices(utils.MakeTranslateMatrix(0.957322, 0.358809, 0.0), world5)
      returnMatrix = utils.multiplyMatrices(
        utils.MakeWorld(selectedTarget.translations[5][0], selectedTarget.translations[5][1], selectedTarget.translations[5][2], 0.0, 0.0, selectedTarget.rotation[5], 1.0),
        afterTrans5)
      break;

    case 6:
      let world6 = utils.MakeWorld(0.0, 0.0, 0.0, 180.0, 90.0, 0.0, 1.0);
      let afterTrans6 = utils.multiplyMatrices(utils.MakeTranslateMatrix(1.967322, -0.931023, 0.0), world6)
      returnMatrix = utils.multiplyMatrices(
        utils.MakeWorld(selectedTarget.translations[6][0], selectedTarget.translations[6][1], selectedTarget.translations[6][2], 0.0, 0.0, selectedTarget.rotation[6], 1.0),
        afterTrans6)
      break;
  }
  return returnMatrix;
}