export class UserInfo {
  constructor(profileName, profileJob, profilePhoto) {
    this._name = profileName;
    this._job = profileJob;
    this._avatar = profilePhoto;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent,
    };
    return userInfo;
  }

  setAvatarPhoto(photo) {
    this._avatar.src = photo
  }

  setUserInfo({name, job}) {
    this._name.textContent = name;
    this._job.textContent = job;

  }
}
