import {Component, HostListener, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  NzDropdownService, NzFormatEmitEvent, NzTreeNode, NzDropdownContextComponent,
  NzMessageService
} from 'ng-zorro-antd';
import {_HttpClient} from "@delon/theme";

@Component({
  selector: 'nz-demo-tree-dir-tree',
  templateUrl: './room-list.component.html',
  styles: [`
    :host ::ng-deep .ant-tree {
      overflow: hidden;
      margin: 0 -24px;
      padding: 0 24px;
    }

    :host ::ng-deep .ant-tree li {
      padding: 4px 0 0 0;
    }

    @keyframes shine {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }

    .shine-animate {
      animation: shine 2s ease infinite;
    }

    .custom-node {
      cursor: pointer;
      line-height: 26px;
      margin-left: 4px;
      display: inline-block;
      margin: 0 -1000px;
      padding: 0 1000px;
    }

    .active {
      background: #1890FF;
      color: #fff;
    }

    .is-dragging {
      background-color: transparent !important;
      color: #000;
      opacity: 0.7;
    }

    .file-name, .folder-name, .file-desc, .folder-desc {
      margin-left: 4px;
    }

    .file-desc, .folder-desc {
      padding: 2px 8px;
      background: #87CEFF;
      color: #FFFFFF;
    }
  `]
})
export class RoomListComponent implements OnInit {
  activedNode: NzTreeNode;
  nodes: Array<any>;

  mouseAction(name: string, e: any): void {
    console.log(name, e);
    if (name === 'dblclick') {
      this.dblclick(e)
    } else if (name === 'click') {
      this.click(e)
    }
  }

  getNodes(): any {
    return [
      new NzTreeNode({
        title: 'root1',
        key: '1001',
        author: 'ANGULAR',
        expanded: true,
        children: [
          {
            title: 'child1',
            key: '10001',
            author: 'ZORRO',
            children: [
              {
                title: 'child1.1',
                key: '100011',
                author: 'ZORRO',
                children: []
              },
              {
                title: 'child1.2',
                key: '100012',
                author: 'ZORRO',
                children: [
                  {
                    title: 'grandchild1.2.1',
                    key: '1000121',
                    author: 'ZORRO-FANS',
                    isLeaf: true,
                    checked: true,
                    disabled: true
                  },
                  {
                    title: 'grandchild1.2.2',
                    key: '1000122',
                    author: 'ZORRO-FANS',
                    isLeaf: true
                  }
                ]
              }
            ]
          }
        ]
      }),
      new NzTreeNode({
        title: 'root2',
        key: '1002',
        author: 'ANGULAR',
        expanded: false,
      })
    ]
  }

  click(data: NzFormatEmitEvent): void {
    this.activedNode = data.node;
  }

  dblclick(data: NzFormatEmitEvent): void {
    if (!data.node.isExpanded) {
      data.node.origin.isLoading = true;
      setTimeout(() => {
        data.node.isExpanded = !data.node.isExpanded;
        data.node.origin.isLoading = false;
      }, 200);
    } else {
      data.node.isExpanded = !data.node.isExpanded;
    }
  }

  constructor(private http: _HttpClient, public msg: NzMessageService) {
    this.nodes = this.getNodes()
    this.activedNode = this.nodes[0]
  }

  ngOnInit(): void {

  }

  classSaveOk(data): void {

  }
}
