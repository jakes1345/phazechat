class VoteComponent {
  constructor(_0x33506c) {
    this.parent = _0x33506c;
    this.sideBarVoteTitle = findNodeInWindowOrParent("#sideBarVoteTitle");
    this.sidebarItemDataVote = findNodeInWindowOrParent(".sidebar [data-vote]");
    this.dataVoteErr = findNodeInWindowOrParent(".sidebar [data-vote-err]");
    this.dataVoteData = findNodeInWindowOrParent(".sidebar [data-vote-data]");
    this.dataVoteCustomErr = findNodeInWindowOrParent(".sidebar [data-custom-err]");
    this.dataVoteQuestion = findNodeInWindowOrParent(".sidebar [data-vote-question]");
    this.dataVoteAnswer = findNodeInWindowOrParent(".sidebar [data-vote-answers]");
    this.voteBtn = findNodeInWindowOrParent("#voteBtn");
    this.viewResult = findNodeInWindowOrParent("[data-view-result]");
    this.voteFooter = findNodeInWindowOrParent(".voteFooter");
    this.dataVoteCountDiv = findNodeInWindowOrParent("[data-vote-count-div]");
    this.dataVoteCount = findNodeInWindowOrParent("[data-vote-count]");
    this.overlay = findNodeInWindowOrParent(".voteOverlay");
    this.endCount = findNodeInWindowOrParent(".endCount");
    this.over = findNodeInWindowOrParent(".over");
    this.voteBtnDisabled = !1;
    this.debugUrl = "";
    this.countdownInterval;
  }
  loadVoteData() {
    const {
      get: _0x265f16,
      post: _0x239b45
    } = this.getURLs();
    this?.parent?.dataMenu?.classList?.add("d-none");
    this.sidebarItemDataVote?.classList?.remove("d-none");
    this.dataVoteErr?.classList?.add("d-none");
    this.sideBarVoteTitle?.classList?.remove("d-none");
    this.resetVoteContent();
    if (_0x265f16 != null && _0x239b45 != null) {
      this.showHideOverlay(true);
      this.fetchVoteData(_0x265f16 + this.getCacheBust(), _0xdf83b3 => this.setVoteData(_0xdf83b3));
    } else {
      this.showMessageDiv("[data-no-poll-running]", true);
    }
  }
  fetchVoteData(_0x2d56cc = null, _0x105246) {
    fetch(this.debugUrl + _0x2d56cc).then(_0x45a89e => _0x45a89e.json()).then(_0x12c25b => {
      if (_0x105246) {
        _0x105246(_0x12c25b);
      }
    }).catch(_0x5c3c21 => {
      console.error("Error: " + _0x5c3c21);
      if (_0x105246) {
        _0x105246({});
      }
    });
  }
  setVoteData(_0x1ad0bb = {}, _0x32444a = false) {
    this.resetVoteContent();
    this.resetAllErr();
    this.showHideOverlay(!1);
    if (!_0x1ad0bb.data) {
      this.showMessageDiv("[data-no-poll-running]", true);
      return;
    }
    const _0x4a65ac = ["DAB5FF", "a3ffc0", "e0ffa5", "FF8C8C", "FF9FCD", "B2F2FF", "aed1ff", "ffc8ae"];
    const _0x1b81b4 = [];
    function _0x41728d() {
      const _0x4f5923 = Math.floor(Math.random() * _0x4a65ac.length);
      const _0x29a1b4 = _0x4a65ac.splice(_0x4f5923, 1)[0];
      _0x1b81b4.push(_0x29a1b4);
      return _0x29a1b4;
    }
    const {
      Question: _0x56a034
    } = _0x1ad0bb.data;
    const _0x3dca49 = _0x1ad0bb.voted ?? !1;
    const _0x53778d = _0x1ad0bb.NbAnswers ?? 0;
    const _0x2c79d4 = _0x1ad0bb.endTime * 1000 ?? 0;
    const _0x5e7206 = () => {
      const _0x4ee3b1 = new Date().getTime();
      const _0x3bec03 = _0x2c79d4 - _0x4ee3b1;
      if (_0x3bec03 > 0) {
        this.endCount.classList.remove("d-none");
        this.over.classList.add("d-none");
        this.endCount.innerText = Math.floor(_0x3bec03 / 86400000) + "d " + Math.floor(_0x3bec03 % 86400000 / 3600000) + "h " + Math.floor(_0x3bec03 % 3600000 / 60000) + "m " + Math.floor(_0x3bec03 % 60000 / 1000) + "s";
      } else {
        this.endCount.classList.add("d-none");
        this.over.classList.remove("d-none");
      }
    };
    if (_0x3dca49 || _0x1ad0bb.readOnly || !config?.MyRegName.length) {
      _0x32444a = true;
    }
    this.dataVoteData?.classList?.remove("d-none");
    this.dataVoteQuestion.innerText = _0x56a034.substring(0, 200);
    this.dataVoteAnswer.innerHTML = "";
    for (let _0x348f6c = 1; _0x348f6c <= _0x53778d; _0x348f6c++) {
      if (_0x1ad0bb.data["answer" + _0x348f6c]) {
        const _0x29051e = _0x1ad0bb.data["answer" + _0x348f6c];
        const _0x519015 = _0x29051e?.percent ?? 0;
        const _0x4f33b = _0x29051e?.votes ?? 0;
        let _0x3ed09e = _0x29051e?.choice;
        let _0x4c0680 = makeElement(this.dataVoteAnswer, "div", "answerVote", "data-vote-" + _0x348f6c);
        makeElement(_0x4c0680, "span").innerText = _0x3ed09e.substring(0, 100);
        let _0x3f105a;
        let _0x334749 = makeElement(_0x4c0680, "div", "voteChartHolder");
        if (_0x3dca49 || _0x32444a) {
          _0x3f105a = makeElement(_0x334749, "div", "voteChart");
          let _0x283e24 = makeElement(_0x334749, "div", "voteChart");
          if (_0x519015 > 0) {
            let _0x4df383 = _0x41728d();
            _0x3f105a.style.width = _0x519015 + "%";
            _0x3f105a.style.backgroundColor = "#" + _0x4df383;
            _0x3f105a.style.position = "absolute";
            _0x283e24.style.backgroundColor = "#e3e3e312";
          } else {
            _0x3f105a.style.backgroundColor = "#e3e3e312";
            _0x283e24.style.display = "none";
          }
          const _0x299fc7 = makeElement(_0x4c0680, "div", "countParent");
          makeElement(_0x299fc7, "div").innerText = _0x519015 + "%";
          if (_0x4f33b > 0) {
            const _0x1ed17a = makeElement(_0x299fc7, "div", "votesCountDiv");
            _0x1ed17a.classList.add("d-none");
            _0x1ed17a.innerText = "" + _0x4f33b;
            _0x299fc7.style.cursor = "pointer";
            _0x4c0680.addEventListener("click", () => {
              _0x1ed17a.classList.remove("d-none");
              _0x299fc7.style.cursor = "";
            });
          }
        } else {
          _0x4c0680.classList.add("voteNonChart");
          let _0xa9ffa1 = makeElement(_0x4c0680, "span", "voteCheckBoxLabel");
          let _0x3bea5b = makeElement(_0xa9ffa1, "input", "voteCheckbox");
          _0x3bea5b.type = "radio";
          _0x3bea5b.name = "voteCheckbox";
          _0x3bea5b.id = "sideBarVoteCheckbox" + _0x348f6c;
          _0x3bea5b.value = _0x348f6c;
          _0x4c0680.addEventListener("click", function () {
            _0x3bea5b.click();
          });
        }
      }
    }
    if (_0x32444a) {
      this.voteBtn.classList.add("d-none");
      this.viewResult.classList.add("d-none");
      this.voteFooter.classList.remove("d-none");
      this.dataVoteCountDiv.classList.remove("d-none");
      this.dataVoteCount.innerText = _0x1ad0bb.total ?? 0;
    } else {
      this.voteFooter.classList.remove("d-none");
      this.dataVoteCountDiv.classList.add("d-none");
      this.voteBtn.classList.remove("d-none");
      this.viewResult.classList.remove("d-none");
    }
    _0x5e7206();
    this.countdownInterval = setInterval(_0x5e7206, 1000);
    this.voteBtn?.removeEventListener("click", this.submitVote);
    this.voteBtn?.addEventListener("click", this.submitVote);
    this.viewResult?.removeEventListener("click", this.viewResults);
    this.viewResult?.addEventListener("click", this.viewResults);
  }
  submitVote() {
    const _0xd68865 = findNodeInWindowOrParent("[name=\"voteCheckbox\"]:checked");
    const _0xc13e32 = _Activity.instance.QuickBar.voteComponent;
    if (!_0xd68865 || _0xc13e32.voteBtnDisabled) {
      return;
    }
    _0xc13e32.voteBtnDisabled = !0;
    let {
      post: _0x39984c
    } = _0xc13e32.getURLs();
    _0x39984c += "&vote=" + _0xd68865.value;
    _0xc13e32.showHideOverlay(!0);
    fetch(_0xc13e32.debugUrl + _0x39984c).then(_0x1b82d3 => _0x1b82d3.json()).then(_0x50a4fc => {
      if (_0x50a4fc.ResVote && _0x50a4fc.ResVote == "OK") {
        _0xc13e32.setVoteData(_0x50a4fc);
        _0xc13e32.showMessageDiv("[data-ok-vote]", !0);
        setTimeout(() => {
          _0xc13e32.showMessageDiv("[data-ok-vote]", !1);
        }, 5000);
      } else if (_0x50a4fc.Err) {
        let _0x385a3d = "";
        if (typeof _0x50a4fc.Err == "string") {
          _0x385a3d = _0x50a4fc.Err;
        } else {
          const {
            localize: _0x52a5d5,
            message: _0x17bd8c
          } = _0x50a4fc.Err;
          _0x385a3d = GetTranslation(_0x52a5d5);
          _0x385a3d ||= _0x17bd8c;
        }
        if (_0x385a3d) {
          _0xc13e32.showMessageDiv("[data-custom-err]", true);
          _0xc13e32.dataVoteCustomErr.innerHTML = _0x385a3d;
        } else {
          _0xc13e32.showMessageDiv("[data-failed-vote]", true);
        }
      } else {
        _0xc13e32.showMessageDiv("[data-failed-vote]", !0);
      }
      _0xc13e32.showHideOverlay(!1);
      _0xc13e32.voteBtnDisabled = !1;
    }).catch(() => {
      _0xc13e32.showMessageDiv("[data-failed-vote]", true);
      _0xc13e32.showHideOverlay(false);
      _0xc13e32.voteBtnDisabled = false;
    });
  }
  viewResults() {
    const _0x448c5d = _Activity.instance.QuickBar.voteComponent;
    const {
      get: _0x4bd9c8
    } = _0x448c5d.getURLs();
    _0x448c5d.showHideOverlay(!0);
    _0x448c5d.fetchVoteData(_0x4bd9c8 + _0x448c5d.getCacheBust(), _0x124e26 => _0x448c5d.setVoteData(_0x124e26, !0));
  }
  getURLs() {
    return _Activity.instance.voteURLs;
  }
  showMessageDiv(_0x38f1c3 = null, _0x4f4839 = false) {
    const _0x559107 = findNodeInWindowOrParent(_0x38f1c3);
    if (_0x559107) {
      this.dataVoteErr?.classList?.remove("d-none");
      if (_0x4f4839) {
        _0x559107.classList.remove("d-none");
      } else {
        _0x559107.classList.add("d-none");
        this.dataVoteErr?.classList?.add("d-none");
      }
    }
  }
  reset() {
    this.sidebarItemDataVote?.classList.add("d-none");
    this.sideBarVoteTitle?.classList.add("d-none");
    this.voteFooter.classList.add("d-none");
    this.dataVoteCountDiv.classList.add("d-none");
    this.resetAllErr();
    this.showHideOverlay(!1);
    clearInterval(this.countdownInterval);
    this.countdownInterval = undefined;
  }
  resetVoteContent() {
    this.dataVoteQuestion.innerText = "";
    this.dataVoteAnswer.innerText = "";
    this.dataVoteCount.innerText = "";
  }
  resetAllErr() {
    this.showMessageDiv("[data-ok-vote]", !1);
    this.showMessageDiv("[data-failed-vote]", !1);
    this.showMessageDiv("[data-no-poll-running]", !1);
    this.showMessageDiv("[data-custom-err]", !1);
  }
  showHideOverlay(_0x22f559 = true) {
    if (_0x22f559) {
      this.overlay?.classList?.remove("d-none");
    } else {
      this.overlay?.classList?.add("d-none");
    }
  }
  getCacheBust() {
    return "&c=" + Date.now();
  }
}