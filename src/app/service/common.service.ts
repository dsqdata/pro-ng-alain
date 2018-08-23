import {Injectable} from '@angular/core';
import {map} from "rxjs/internal/operators";
import {_HttpClient} from "@delon/theme";
import {NzMessageService} from "ng-zorro-antd";

@Injectable()
export class CommonService {

  constructor(private http: _HttpClient, public msg: NzMessageService) {
  }

  getFloorNodes = function (callback) {
    var companyObject = {};
    var communityObject = {};
    var floorObject = {};
    var ar = []
    this.http.post('api/company/getCompanyInfoTree').subscribe(
      (obj: any) => {
        if (obj.state == "success") {
          var companyList = obj.companyList;
          var communityList = obj.communityList;
          var floorList = obj.floorList;

          for (var i in companyList) {
            companyObject[companyList[i]._id] = companyList[i].name
            var companyObj = {
              label: companyList[i].name,
              value: companyList[i]._id,
              children: []
            }

            for (var j in communityList) {
              communityObject[communityList[j]._id] = communityList[j].name
              if (companyList[i]._id === communityList[j].companyId) {
                var communityObj = {
                  label: communityList[j].name,
                  value: communityList[j]._id,
                  children: []
                }

                for (var k in floorList) {
                  floorObject[floorList[k]._id] = floorList[k].name
                  if (communityList[j]._id === floorList[k].communityId) {
                    var floorObj = {
                      label: floorList[k].name,
                      value: floorList[k]._id,
                      isLeaf: true,
                    }
                    communityObj.children.push(floorObj)
                  }
                }
                if (communityObj.children.length > 0) {
                  companyObj.children.push(communityObj)
                }
              }
            }
            if (companyObj.children.length > 0) {
              ar.push(companyObj)
            }
          }

          callback({
            nzOptions: ar,
            companyObject: companyObject,
            communityObject: communityObject,
            floorObject: floorObject,
          })
        } else {
          this.msg.error(obj.message)
          callback({})
        }
      })
  }
  getClassNodes = function (callback) {
    var companyObject = {};
    var communityObject = {};
    var floorObject = {};
    var classObject = {};
    var ar = []
    this.http.post('api/company/getCompanyInfoTree').subscribe(
      (obj: any) => {
        if (obj.state == "success") {
          var companyList = obj.companyList;
          var communityList = obj.communityList;
          var floorList = obj.floorList;
          var classList = obj.classList;
          var routeList = obj.routeList;

          for (var i in companyList) {
            companyObject[companyList[i]._id] = companyList[i].name
            var companyObj = {
              label: companyList[i].name,
              value: companyList[i]._id,
              children: []
            }

            for (var j in communityList) {
              communityObject[communityList[j]._id] = communityList[j].name
              if (companyList[i]._id === communityList[j].companyId) {
                var communityObj = {
                  label: communityList[j].name,
                  value: communityList[j]._id,
                  children: []
                }

                for (var k in floorList) {
                  floorObject[floorList[k]._id] = floorList[k].name
                  if (communityList[j]._id === floorList[k].communityId) {
                    var floorObj = {
                      label: floorList[k].name,
                      value: floorList[k]._id,
                      children: []
                    }
                    for (var o in classList) {
                      classObject[classList[o]._id] = classList[o].name
                      if (floorList[k]._id === classList[o].floorId) {
                        var classObj = {
                          label: classList[o].name,
                          value: classList[o]._id,
                          isLeaf: true,
                        }
                        floorObj.children.push(classObj)
                      }
                    }
                    if (floorObj.children.length > 0) {
                      communityObj.children.push(floorObj)
                    }
                  }
                }
                if (communityObj.children.length > 0) {
                  companyObj.children.push(communityObj)
                }
              }
            }
            if (companyObj.children.length > 0) {
              ar.push(companyObj)
            }
          }

          callback({
            nzOptions: ar,
            companyObject: companyObject,
            communityObject: communityObject,
            floorObject: floorObject,
            classObject: classObject
          })
        } else {
          this.msg.error(obj.message)
          callback({})
        }
      })
  }


}
