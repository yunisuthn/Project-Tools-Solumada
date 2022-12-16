const getById = (id) => document.getElementById(id);
const docQuery = query => document.querySelector(query);
const docQueryAll = query => document.querySelectorAll(query);

/**
 * 
 * @param {string} target if top push from
 */

function tNewCard(target = 'top', fieldId, boardId) {
    const dragdropDiv = document.getElementById(fieldId);
    // find add form
    const isAddForm = [...dragdropDiv.children].some(e => e.classList.contains('add-form'));
    // if add does not exist
    if (!isAddForm) {
        const addTemplate = tAddFormTemplate(target, fieldId, boardId);
        // check target
        if (target === 'top') {
            // count element in todo div
            if (dragdropDiv.childElementCount > 0) {
                dragdropDiv.firstElementChild.before(addTemplate);
            } else {
                // insert before the first element
                dragdropDiv.appendChild(addTemplate);
            }
        } else {
            dragdropDiv.append(addTemplate);
        }
    }
}
/**
 * 
 * @param {string} target top/bottom
 * @param {string} parentId element tag id
 * @param {string} boardId id of board
 * @returns element tag
 */
function tAddFormTemplate(target, parentId, boardId) {
    const div = document.createElement('div');
    div.className = "item-card view add-form";
    const form = document.createElement('form');
    const div_fg1 = document.createElement('div');
    div_fg1.className = "form-group";
    // create label for the input
    const label = document.createElement('label');
    label.className = 'text-muted';
    label.textContent = "Nouveau";
    div_fg1.append(label);
    // create textarea input
    const textarea = document.createElement('textarea');
    textarea.rows = "1"; textarea.className = "form-control";
    textarea.id = "new-card-title";
    div_fg1.append(textarea);
    const div_fg2 = document.createElement('div');
    div_fg2.className = "form-group mt-1";
    // create add button
    const button_add = document.createElement('button');
    button_add.type = "button";
    button_add.className = "btn-primary btn btn-sm";
    button_add.textContent = "Nouveau";
    // handle add button event
    button_add.onclick = () => {
        // send to server
        if (textarea.value.trim().length > 0) {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const json = JSON.parse(this.response);
                    if (json.status === 1) {
                        const item = json.newListItem;
                        const date = new Date(item.createdAt);
                        console.log(date)
                        let viewCard = tViewCardTemplateItem({title: item.title, itemId: item._id, date: date.toLocaleDateString(), theme: item.theme, members: 0, checklist: 0});
                        tNewViewCard(viewCard, json.newListItem.parent, target);
                        div.remove();
                        // update each item row
                        tUpdateItemRows();
                    }
                }
            }
            xhr.open('POST', '/gestion-projet/listitem', true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send("title=" + textarea.value + "&parent=" + parentId + "&boardid=" + boardId);
        }
    }
    div_fg2.append(button_add);
    // create cancel button
    const button_cancel = document.createElement('button');
    button_cancel.type = "button";
    button_cancel.className = "btn-danger btn btn-sm ms-1";
    button_cancel.textContent = "Annuler";
    // handle cancel button event
    button_cancel.onclick = () => div.remove();
    div_fg2.append(button_cancel);
    form.append(div_fg1); form.append(div_fg2);
    div.append(form);
    return div;
}

function tEditFormTemplate(itemId, title, prevForm) {
    const div = document.createElement('div');
    div.className = "item-card view add-form";
    const form = document.createElement('form');
    const div_fg1 = document.createElement('div');
    div_fg1.className = "form-group";
    // create textarea input
    const textarea = document.createElement('textarea');
    textarea.rows = "1"; textarea.className = "form-control";
    textarea.id = "new-card-title";
    textarea.value = title;
    div_fg1.append(textarea);
    textarea.focus(); // it focusses the text
    textarea.setSelectionRange(0, textarea.value.length);
    const div_fg2 = document.createElement('div');
    div_fg2.className = "form-group mt-1";
    // create add button
    const button_add = document.createElement('button');
    button_add.type = "button";
    button_add.className = "btn-primary btn btn-sm";
    button_add.textContent = "Valider";
    // handle add button event
    button_add.onclick = () => {
        // send to server
        if (textarea.value.trim().length > 0) {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const json = JSON.parse(this.response);
                    if (json.status === 1) {
                        const item = json.updated;
                        const percent = (Math.floor((item.checklist.filter(e => e.checked).length * 100 / item.checklist.length) || 0));
                        const date = new Date(item.createdAt)
                        let viewCard = tViewCardTemplateItem({title: textarea.value, date: date.toLocaleDateString(), itemId: item._id, theme: item.theme, members: item.members.length, checklist: percent});
                        // tNewViewCard(viewCard, json.newListItem.parent, target);
                        // update in the shared item
                        const span = getById('shared-item-' + item._id);
                        if (span) span.textContent = textarea.value;
                        div.after(viewCard);
                        div.remove();
                        // update each item row
                        tUpdateItemRows();
                    }
                }
            }
            xhr.open('PUT', '/gestion-projet/listitem/' + itemId, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send("data=" + JSON.stringify({ title: textarea.value }));
        }
    }
    div_fg2.append(button_add);
    // create cancel button
    const button_cancel = document.createElement('button');
    button_cancel.type = "button";
    button_cancel.className = "btn-danger btn btn-sm ms-1";
    button_cancel.textContent = "Annuler";
    // handle cancel button event
    button_cancel.onclick = () => {
        div.before(prevForm);
        div.remove();
    };
    div_fg2.append(button_cancel);
    form.append(div_fg1); form.append(div_fg2);
    div.append(form);
    return div;
}


function tViewCardTemplateItem(data = {}) {
    const div = document.createElement('div');
    div.draggable = true;
    div.className = "item-card view";
    div.setAttribute('data-tag', data.itemId);
    // theme and title
    const div1 = document.createElement('div');
    // theme
    const p = document.createElement('p');
    p.className = "item-card-theme";
    p.style.background = data.theme; //['pink', 'lightgreen', 'cyan', 'lightblue'][Math.floor(Math.random() * 4)] // theme
    if (data.theme === '#fff') {
        p.setAttribute('hidden', 'hidden');
    }
    // time
    const i2 = document.createElement('i');
    i2.className = "fa fa-calendar";
    p.appendChild(i2);
    p.appendChild(document.createTextNode(' ' + data.date));
    div1.append(p);
    const span = document.createElement('span');
    span.className = "item-card-label";
    // limit string length to 17
    let string = data.title.split('').map((e, i) => i < 38 ? e : '').join('') + '...';
    span.textContent = data.title.length > 38 ? string : data.title;
    span.draggable = false;
    div1.append(span);
    div.append(div1);
    // create pen icon
    // button
    const btn = document.createElement('button');
    const i = document.createElement('i');
    i.className = "fa fa-pen";
    btn.onclick = () => {
        const template = tEditFormTemplate(data.itemId, data.title, div);
        div.before(template);
        div.remove();
    }
    btn.append(i);
    div.append(btn);

    // some infos
    const div_infos = document.createElement('div');
    div_infos.className = 'item-card-infos';
    // members
    const p_members = document.createElement('p');
    const i_members = document.createElement('i');
    const span_members = document.createElement('span');
    i_members.className = 'fa fa-user me-1';
    span_members.id = 'member-' + data.itemId;
    span_members.textContent = data.members;
    p_members.appendChild(i_members);
    p_members.appendChild(span_members);
    // check list
    const p_checklist = document.createElement('p');
    const i_checklist = document.createElement('i');
    const span_checklist = document.createElement('span');
    span_checklist.id = 'checklist-' + data.itemId;
    span_checklist.textContent = Math.floor(data.checklist || 0) + '%';
    i_checklist.className = 'fa fa-check me-1';
    p_checklist.appendChild(i_checklist);
    p_checklist.appendChild(span_checklist);

    div_infos.append(p_members);
    div_infos.append(p_checklist);

    div1.append(div_infos);

    // handle drag and drop event
    const trashField = document.getElementById('ttrash');

    div.ondragstart = (e) => {
        // e.preventDefault();
        e.dataTransfer.effectAllowed = "copyMove";
        e.target.classList.add('dragging');
        // show trash field
        if (trashField.hasAttribute('hidden')) {
            trashField.removeAttribute('hidden');
        }
    }
    div.ondragend = (e) => {
        console.log('end');
        e.target.classList.remove('dragging');
        // hide button if no performing task
        if (!trashField.classList.contains('loading') && !trashField.classList.contains('finished')) {
            trashField.setAttribute('hidden', '');
        }
    }
    // open modal
    
    div.ondblclick = () => {
        getListItemInfo(data);
    }
    return div;
}

function getListItemInfo(data) {
    // send request to server
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const json = JSON.parse(this.response);
            if (json.status === 1) {
                // open form
                const modal = document.getElementById('tmodal-1');
                modal.removeAttribute('hidden');
                // initialize modal with data
                initTModal(json.list, json.parent, json.users);
            }
        }
    }
    xhr.open('GET', '/gestion-projet/listitem/'+ data.itemId, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(null);
}

/// check shared item
function checkSharedItem(id) {
    getListItemInfo({itemId: id});
}

/**
 * 
 * @param {element} template html element
 * @param {string} elementDivId element id
 * @param {string} target top/bottom
 */
function tNewViewCard(template, elementDivId, target = 'bottom') {
    const dragdropDiv = document.getElementById(elementDivId);
    // if target top & div field has first element
    if (target === 'top' && dragdropDiv.firstElementChild) {
        // insert before the element
        dragdropDiv.firstElementChild.before(template);
    } else {
        // insert after
        dragdropDiv.append(template);
    }
}

var draggedElement = null;
function tInitDrag() {
    const containers_div = [...document.querySelectorAll('.container-dragdrop')];
    const trashField = document.getElementById('ttrash');
    trashField.addEventListener('dragenter', (e) => {
        e.preventDefault();
        trashField.classList.add('dragenter');
        selectedItem = e.target;
    });
    trashField.addEventListener('dragleave', (e) => {
        // e.preventDefault();
        trashField.classList.remove('dragenter');
    });
    trashField.addEventListener('dragover', (e) => {
        e.dataTransfer.dropEffect = "move";
        e.preventDefault();
    });
    trashField.addEventListener('drop', (e) => {
        e.preventDefault();
        // the element dragged
        const draggedE = draggedElement.element;
        if (draggedE) {
            // id of the item element
            const id = draggedE.attributes['data-tag'].value;
            trashField.removeAttribute('hidden');
            trashField.classList.add('loading');
            // send to server
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const json = JSON.parse(this.response);
                    if (json.status === 1) {
                        // remove the item from page
                        trashField.removeAttribute('hidden');
                        if (!trashField.hasAttribute('hidden')) {
                            draggedE.remove();
                            trashField.removeAttribute('hidden');
                            trashField.classList.replace('loading', 'finished');
                            setTimeout(() => {
                                trashField.style.animation = "fadeout 3s forward";
                                setTimeout(() => {
                                    trashField.setAttribute('hidden', '');
                                    trashField.classList.remove('finished');
                                    trashField.classList.remove('dragenter');
                                    trashField.style.animation = "";
                                }, 2000);
                            }, 1000);
                        }
                    }
                }
            }
            xhr.open('DELETE', '/gestion-projet/listitem/'+ id, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(null);
        }
    });

    const enter = (e) => {
        e.dataTransfer.dropEffect = "copy";
        e.preventDefault();
        console.log('enter');
    }
    const leave = () => {
        console.log('leave');
    }
    const drop = (e) => {
        e.preventDefault();
        // update server
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            const json = JSON.parse(this.response);
            if (json.status === 1) {
                console.log('ok')
                // update the each item rows to arrange the range
                tUpdateItemRows();
            }
          }
        }
        xhr.open('POST', '/gestion-projet/movelistitem', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send('parent=' + draggedElement.parent + "&child=" + draggedElement.child);
        console.log(draggedElement);
    }
    const dragAfterElement = (container, y) => {
        const draggableElements = [...container.querySelectorAll('.item-card.view:not(.dragging)')]
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child} ;
            } else {
                return closest;
            }
        }, {offset: Number.NEGATIVE_INFINITY})
    }
    containers_div.forEach(element => {
        element.addEventListener('dragover', (e) => {
            e.preventDefault();
            const afterElement = dragAfterElement(element, e.clientY);
            const draggable = document.querySelector('.dragging');
            if (afterElement) {
                element.insertBefore(draggable, afterElement.element);
            } else {
                element.appendChild(draggable);
            }
            draggedElement = {
                parent: element.id,
                child: draggable.attributes['data-tag'].value,
                element: draggable
            };
            
        })
        element.addEventListener('dragenter', enter);
        element.addEventListener('dragleave', leave);
        element.addEventListener('drop', drop)
    });
}

// for (let index = 0; index < 7; index++) {
//     tNewViewCard(tViewCardTemplateItem({title: 'TO DO item ' + index }), 'todo-card');
// }


tInitDrag();

function tShortElement(elementDivId) {
    const dragdropDiv = document.getElementById(elementDivId);
    // get element children in array
    const childrenElements = [...dragdropDiv.children];
    // short
    const shortedElements = [...childrenElements];
    console.log(shortedElements)
    shortedElements.short();
    // return old order and short order
    return {
        default: childrenElements,
        shorted: shortedElements
    };
}
function tShortByAlphabetic(elementDivId, e) {
    const dragdropDiv = document.getElementById(elementDivId);
    const shortedElements = tShortElement(elementDivId).shorted;
    dragdropDiv.innerHTML = '';
    shortedElements.forEach(e => { dragdropDiv.append(e); })
}


// item select
function tThemeHaldler() {
    const tThemeItems = document.querySelectorAll('.ttheme-item');
    var selectedItem = null;
    for (const item of tThemeItems) {
        item.onclick = () => {
            if (selectedItem) {
                selectedItem.classList.remove('selected');
            }
            item.classList.add('selected');
            selectedItem = item;
            // update theme active background and set input theme value
            document.getElementById('tmodal-litem-theme-active').style.background = item.style.background;
            document.getElementById('tmodal-litem-theme-input').value = item.style.background;
            document.getElementById('tmodal-litem-theme-active-name').textContent = item.style.background;
        }
    }
}
tThemeHaldler();

// add member
function tMemberTemplateItem(context) {
    const span = document.createElement('span');
    span.textContent = context;
    const button = document.createElement('button');
    // remove button event handler
    button.onclick = () => {
        span.remove();
        // put the item back into the members list
        const template = tMemberListItemTemplate(context);
        getById('listofmembers').appendChild(template);
    };
    // icon times
    const i = document.createElement('i');
    i.className = "text-white fa fa-times";
    button.append(i);
    span.append(button)
    return span;
}

function tMemberListItemTemplate (member) {
    const div = document.createElement('div');
    div.id = 'user-'+member;
    const option = document.createElement('option');
    option.textContent = member;
    option.value = member;
    div.append(option);
    const button = document.createElement('button');
    const i = document.createElement('i');
    i.className = "fa fa-plus";
    button.append(i);
    button.setAttribute('onclick', `tMoveMember('${member}')`);
    div.append(button);
    return div;
}

function tAddMember() {
    const tMember_input = document.getElementById('tmember-input');
    if (tMember_input.value.trim().length > 1) {
        let template = tMemberTemplateItem(tMember_input.value);
        // append in the list
        document.getElementById('tmodal-litem-members').append(template);
        tMember_input.value = '';
    }
}

function tMoveMember(member) {
    const div = getById('user-'+member);
    let template = tMemberTemplateItem(member);
    // append in the list
    document.getElementById('tmodal-litem-members').append(template);
    div.remove();
}

function tcardChecklistExpandItem(e, layoutId) {
    const i = e.firstElementChild;
    const layout = document.getElementById(layoutId);
    if (i.classList.contains('fa-eye')) {
        i.classList.replace('fa-eye', 'fa-eye-slash');
        layout.removeAttribute('hidden');
        layout.style.animation = "tcard-details-anim-toptobottom .3s ease-out forwards"

    } else {
        i.classList.replace('fa-eye-slash', 'fa-eye');
        layout.style.animation = "tcard-details-anim-bottomtotop .3s ease-out forwards"
        setTimeout(() => {
            layout.setAttribute('hidden', '');
        }, 300);
    }
}

function tcardChecklistDeleteItem(e) {
    setTimeout(() => {
        e.parentElement.parentElement.remove();
        // update progress bar
        tCardCheckListUpdateProgressBar();
    }, 300);
}

function tCardCheckListShowAddForm(e) {
    const layout = e.nextElementSibling;
    if (layout.hasAttribute('hidden')) {
        layout.removeAttribute('hidden'); // show layout
        e.setAttribute('hidden', ''); // hide btn
    }
}
function tCardCheckListCancelForm(e) {
    let layout = e.parentElement.parentElement;
    console.log(layout.className)
    const newCheckListBtn = layout.previousElementSibling;
    layout.setAttribute('hidden', '');
    if (newCheckListBtn.hasAttribute('hidden')) {
        newCheckListBtn.removeAttribute('hidden');
    }
}

// create random id
function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

// Add new item in checklist
function tCardCheckListAddItem(e) {
    const title = document.getElementById('tcard-checklist-title-input');
    const assigned = document.getElementById('tcard-checklist-assigned-input');
    const duedate = document.getElementById('tcard-checklist-duedate-input');
    if (title.value.trim().length > 0) {
        const context = {
            id: create_UUID(),
            title: title.value,
            assigned: assigned.value,
            dueDate: duedate.value
        }
        const template = tCardChecklistItemTemplate(context);
        // populate checklist
        document.getElementById('tmodal-litem-checklist').append(template);
        // hide form
        tCardCheckListCancelForm(e.nextElementSibling);
        title.value = ''; assigned.value = ''; duedate.value = '';
        // update progress bar
        tCardCheckListUpdateProgressBar();
    }
}

// checklist item template
function tCardChecklistItemTemplate(context = {}) {
    const div = document.createElement('div');
    div.className = "tcard-checklist-item";
    div.innerHTML = `
    <!-- check -->
    <div class="tform-check">
      <input class="form-check-input" ${context.checked ? 'checked' : ''} onchange="tCardCheckListUpdateProgressBar()" type="checkbox" id="check-${context.id}">
      <label class="form-check-label" for="check-${context.id}">
        <div class="tcard-checklist-details">
          <div class="tcard-checklist-item-title">
            <i class="fa fa-tag"></i>
            <input type="text" value="${context.title}" id="tcard-checklist-item-title-input"-${context.id}>
          </div>
          <div class="tcard-checklist-hidden-details" id="details-${context.id}" hidden>
            <!-- assign -->
            <div class="tcard-checklist-item-assigned">
              <i class="fa fa-user"></i>
              <input type="text" value="${context.assigned}" id="tcard-checklist-item-assigned-input"-${context.id}>
            </div>
            <!-- due date -->
            <div class="tcard-checklist-item-duedate">
              <i class="fa fa-calendar-alt"></i>
              <input type="date" name="" value="${context.dueDate}" id="tcard-checklist-item-duedate-input"-${context.id}>
            </div>
          </div>
        </div>
      </label>
    </div>
    <!-- action -->
    <div class="tcard-checklist-item-action">
      <button class="tbtn-custom" onclick="tcardChecklistExpandItem(this, 'details-${context.id}')"><i class="fa fa-eye"></i></button>
      <button class="tbtn-custom" onclick="tcardChecklistDeleteItem(this)"><i class="fa fa-trash"></i></button>
    </div>`;
    return div;
}

// Progressbar checklist item
function tCardCheckListUpdateProgressBar() {
    const checkListItems = [...document.querySelectorAll('.tcard-checklist-item')];
    const checkedItems = checkListItems.filter(element => element.firstElementChild.firstElementChild.checked);
    // calculate percent of checked item
    const percent = Math.floor(checkedItems.length * 100 / checkListItems.length) || 0;
    tCardCheckListSetProgressBar(percent);
}

// to update progress bar in checklist
function tCardCheckListSetProgressBar(value) {
    const progressbar = document.querySelector('.tcard-checklist-progress');
    const progress = progressbar.firstElementChild.firstElementChild;
    const percent = progressbar.lastElementChild;
    percent.textContent = progress.style.width = value + '%';
}

tCardCheckListUpdateProgressBar();


// Modal 
// dismiss
function tModalDismiss(modalId) {
    const modal = document.getElementById(modalId);
    modal.firstElementChild.style.animation = 'fadeOut .3s forwards ease';
    setTimeout(() => {
        modal.setAttribute('hidden', '');
        modal.firstElementChild.style.animation = '';
    }, 300);
}

// list
function tCardListTemplate(context = {}) {
    const div = document.createElement('div');
    div.id = `c-card-${context.listId}`
    div.innerHTML = `
    <div class="c-card">
      <div class="c-card-header" ondblclick="tCardEditTitle('${context.listId}')">
        <input type="text" id="c-card-field-${context.listId}" value="${context.listTitle}" disabled>
        <div class="c-card-actions" id="c-card-actions1-${context.listId}" hidden>
            <button onclick="tCardSaveEditedTitle('${context.listId}')">
                <i class="fa fa-save"></i>
            </button>
            <button onclick="tCardCancelTitle('${context.listId}')">
                <i class="fa fa-times"></i>
            </button>
        </div>
        <div class="btn-group" role="group" id="c-card-actions2-${context.listId}">
          <a href="#" type="button" class="text-decoration-none text-dark c-card-menu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa-solid fa-ellipsis"></i></a>
          <div class="dropdown-menu" aria-labelledby="">
            <a class="dropdown-item" href="#" onclick="tNewCard('top', '${context.listId}', '${context.boardId}')"><i class="fa fa-add"></i> Nouveau</a>
            <a class="dropdown-item" href="#" onclick="tCardEditTitle('${context.listId}')"><i class="fa fa-edit"></i> Editer</a>
            <a class="dropdown-item" href="#" onclick="tCardOpenFilter('${context.listId}')"><i class="fa fa-filter"></i> Filtrer</a>
            <a class="dropdown-separator" href="#"></a>
            <a class="dropdown-item" href="#" onclick="tCardListRemove('${context.listId}', '${context.listTitle}')"><i class="fa fa-trash-alt"></i> Supprimer</a>
          </div>
        </div>
      </div>
      <div class="c-card-search" id="filter-${context.listId}" hidden>
        <input type="search" placeholder="Filtrer" onkeyup="tFilterItem(this, '${context.listId}')">
        <button onclick="tCardCloseFilter('${context.listId}')"><i class="fa fa-times"></i></button>
      </div>
      <div class="card-body mt-3">
          <div class="container-dragdrop" id="${context.listId}">
          </div>
          <div class="item-card tadd">
              <button onclick="tNewCard('bottom', '${context.listId}', '${context.boardId}')">+ Nouveau</button>
          </div>
      </div>
    </div>
  </div>`;
    return div;
}

function tCardListAdd(boardId) {
    const title = document.getElementById('tcard-list-title-input');
    if (title.value.trim().length > 0) {

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            const json = JSON.parse(this.response);
            if (json.status === 1) {
                // added list
                const context = {
                    listTitle: json.addedList.title,
                    listId: json.addedList._id,
                    boardId: boardId
                }
                const template = tCardListTemplate(context);
                // append list to the page
                document.getElementById('tcard-list').append(template);
                title.value = "";
                tInitDrag();
            }
          }
        }
        xhr.open('POST', '/gestion-projet/list/'+ boardId, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send('title=' + title.value);
    }
}

// delete list card
function tCardListRemove(listId, title) {
    swal(`Suppression de la liste "${title}". Attention! Votre action est irreversible.`, {
        buttons: {
            cancel: "Annuler",
            catch: {
                text: "Procéder à la suppression.",
                value: "delete",
            }
        },
    }).then((value) => {
        if (value === "delete") {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                const json = JSON.parse(this.response);
                if (json.status === 1) {
                    document.getElementById('c-card-'+json.deletedList._id).remove();
                }
              }
            }
            xhr.open('DELETE', '/gestion-projet/list/delete/'+ listId, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(null);
        }
    });
}

// board
function tBoardSaveItem() {
    const title = document.querySelector('#tboard-item-tile-input');
    if (title.value.trim().length > 0) {
        // send to server
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            const json = JSON.parse(this.response);
            if (json.status === 1) {
                window.location.href = '/gestion-projet/board-item/' + json.board._id;
            }
          }
        }
        xhr.open('POST', '/gestion-projet/board-item', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send('theme=lightblue&title=' + title.value);
        
    }
}
function tBoardCancelItem() {
    const title = document.querySelector('#tboard-item-tile-input');
    title.value = "";
}

// variable to memorize board title before editing
var tBoardItemTitleVar = null;

function tBoardDeleteItemTitle(itemId) {
    swal("Votre action est irreversible!", {
        buttons: {
          cancel: "Annuler",
          catch: {
            text: "Procéder à la suppression.",
            value: "delete",
          }
        },
    })
    .then((value) => {
        if (value === "delete") {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const json = JSON.parse(this.response);
                    if (json.status === 1) {
                        swal("Succèss", "Le Tableau a été supprimé!", "success");
                        setTimeout(() => {
                            window.location.href = "/gestion-projet";
                        }, 3000);
                    }
                }
            }
            xhr.open('DELETE', '/gestion-projet/board-item/'+ itemId, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(null);
        }
    });
}

function tBoardSaveItemTitle(itemId) {
    const action1 = document.querySelector('.action-1-'+ itemId);
    const action2 = document.querySelector('.action-2-'+ itemId);
    const input = document.getElementById(itemId);
    // send to server
    if (input.value.trim().length > 0) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const json = JSON.parse(this.response);
            if (json.status === 1) {
                // hide action1
                if (action1.hasAttribute('hidden')) {
                    action2.setAttribute('hidden', '');
                    action1.removeAttribute('hidden');
                    input.setAttribute('disabled', '');
                }
            }
        }
        }
        xhr.open('PUT', '/gestion-projet/board-item/'+ itemId, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("title=" + input.value);
    }
}

function tBoardEditItemTitle(fieldId) {
    
    const action1 = document.querySelector('.action-1-'+ fieldId);
    const action2 = document.querySelector('.action-2-'+ fieldId);
    const input = document.getElementById(fieldId);
    // hide action1
    if (action2.hasAttribute('hidden')) {
        action1.setAttribute('hidden', '');
        action2.removeAttribute('hidden');
        input.removeAttribute('disabled');
        input.focus();
        tBoardItemTitleVar = input.value;
    }
}

function tBoardCancelItemTitle(fieldId) {
    const action1 = document.querySelector('.action-1-'+ fieldId);
    const action2 = document.querySelector('.action-2-'+ fieldId);
    const input = document.getElementById(fieldId);
    // hide action1
    if (action1.hasAttribute('hidden')) {
        action2.setAttribute('hidden', '');
        action1.removeAttribute('hidden');
        input.setAttribute('disabled', '');
        input.value = tBoardItemTitleVar;
    }
}

// Card list title
var cardTitleTempVar = null;
function tCardEditTitle(cardId) {
    const cardTitle = document.getElementById('c-card-field-'+ cardId);
    const action1 = document.getElementById('c-card-actions1-'+ cardId);
    const action2 = document.getElementById('c-card-actions2-'+ cardId);

    if (action1.hasAttribute('hidden')) {
        action1.removeAttribute('hidden');
        action2.setAttribute('hidden', '');
        if (cardTitle.hasAttribute('disabled')) {
            cardTitle.removeAttribute('disabled');
            cardTitle.focus();
            cardTitleTempVar = cardTitle.value;
        }
    }
}

function tCardCancelTitle(cardId) {
    const cardTitle = document.getElementById('c-card-field-'+ cardId);
    const action1 = document.getElementById('c-card-actions1-'+ cardId);
    const action2 = document.getElementById('c-card-actions2-'+ cardId);

    if (action2.hasAttribute('hidden')) {
        action2.removeAttribute('hidden');
        action1.setAttribute('hidden', '');
        if (!cardTitle.hasAttribute('disabled')) {
            cardTitle.setAttribute('disabled', '');
            cardTitle.value = cardTitleTempVar;
        }
    }
}

function tCardSaveEditedTitle(cardId) {
    const cardTitle = document.getElementById('c-card-field-'+ cardId);
    // send to server
    if (cardTitle.value.trim().length > 0) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const json = JSON.parse(this.response);
                if (json.status === 1) {
                    // hide action1
                    tCardCancelTitle(cardId);
                    cardTitle.value = json.newTitle;
                }
            }
        }
        xhr.open('PUT', '/gestion-projet/list/'+ cardId, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("title=" + cardTitle.value + "&id=" + cardId);
    }
}


function initTModal(item, parent, users) {
    //  hide add member button
    const div = docQuery('.tmember-available-list');
    const button = docQuery('.tedit-member-showadd > button');
    button.removeAttribute('hidden');
    div.setAttribute('hidden', '');
    // id
    getById('tmodal-litem-id').value = item._id;
    // title
    getById('tmodal-litem-title').textContent = item.title;
    // parent title
    getById('tmodal-litem-parent-title').textContent = parent.title;
    // members
    getById('tmodal-litem-members').innerHTML = '';
    var membersAvailable = users.map(e => e.email);
    item.members.forEach(member => {
        // reduce avaiable member
        if (membersAvailable.indexOf(member) > -1) {
            membersAvailable.splice(membersAvailable.indexOf(member), 1);
        }
        let template = tMemberTemplateItem(member);
        getById('tmodal-litem-members').append(template)
    });
    const oldmembers = { members: item.members }
    // set local storage
    localStorage.setItem('oldmembers', JSON.stringify(oldmembers));
    // members available list
    getById('listofmembers').innerHTML = "";
    membersAvailable.forEach(member => {
        let template = tMemberListItemTemplate(member);
        getById('listofmembers').append(template);
    });
    // themes
    getById('tmodal-litem-theme-input').value = item.theme;
    getById('tmodal-litem-theme-active-name').textContent = item.theme;
    getById('tmodal-litem-theme-active').style.background = item.theme;
    if ([...getById('tmodal-litem-theme-div').children].some(div => div.style.background === item.theme)) {
        [...getById('tmodal-litem-theme-div').children].forEach(div => {
            div.classList.remove('selected');
            if (div.style.background === item.theme) {
                div.classList.add('selected');
            }
        }); 
    } else {
        getById('cust-theme').value = item.theme;
    }

    // descriptions
    getById('tmodal-litem-description').value = item.description;
    // checklist
    getById('tmodal-litem-checklist').innerHTML = '';
    item.checklist.forEach(member => {
        console.log(member)
        const context = {
            id: member.id,
            checked: member.checked,
            title: member.title,
            assigned: member.assigned,
            dueDate: member.dueDate
        }
        let template = tCardChecklistItemTemplate(context);
        getById('tmodal-litem-checklist').append(template)
    });
    // activity
    getById('tmodal-litem-activity').value = item.activity;

    tCardCheckListUpdateProgressBar();

}


// function to update range
async function tUpdateItemRows() {
    const cards = [...getById('tcard-list').children];
    const cardIds = cards.map(card => card.id);
    const tData = new Promise((resolve, reject) => {
        var data = [];
        cardIds.forEach(async id => {
            const div = getById(id);
            const itemId = div.firstElementChild.lastElementChild.firstElementChild.id;
            const items = [...getById(itemId).children];
            items.forEach((item, index) => {
                const context = {
                    id: item.attributes['data-tag'].value,
                    range: index
                }
                data.push(context);
            });
        });
        resolve(data);
    });
    
    // send range updated to the server
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () { //Call a function when the state changes.
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            const json = JSON.parse(this.response);
            if (json.status === 1) {
                console.log('Range updated!');
            }
        }
    };
    xmlhttp.open("PUT", "/gestion-projet/updatelistitemrange", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("data="+ JSON.stringify(await tData)); 

}

async function tModalUpdateItem(id) {
    // get all data
    // task title
    const taskTitle = getById("tmodal-litem-title").textContent;
    // members
    const members = getById("tmodal-litem-members");
    const memberValues = [...members.children].map(e => e.textContent);
    // theme
    const theme = getById('tmodal-litem-theme-input').value;
    // description
    const description = getById('tmodal-litem-description').value;
    // checklist
    const checkListDivs = [...docQueryAll(".tcard-checklist-item")]
    const checkList = await new Promise((resolve, reject) => {
        var data = [];
        checkListDivs.forEach(div => {
            const input_check = div.firstElementChild.firstElementChild;
            const itemTitle = input_check.nextElementSibling.firstElementChild.firstElementChild.lastElementChild.value;
            const assiged = input_check.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.lastElementChild.value;
            const dueDate = input_check.nextElementSibling.firstElementChild.lastElementChild.lastElementChild.lastElementChild.value;
            const check = {
                id: create_UUID(),
                title: itemTitle,
                checked: input_check.checked,
                assigned: assiged,
                dueDate: dueDate
            }
            data.push(check);
        });
        resolve(data);
    });
    // activity
    const activity = getById('tmodal-litem-activity').value;

    const dataList = {
        members: memberValues,
        theme: theme,
        description: description,
        checklist: checkList,
        activity: activity,
        taskTitle: taskTitle,
        oldmembers: JSON.parse(localStorage.getItem('oldmembers')).members
    }
    
    // send request to server
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () { //Call a function when the state changes.
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            const json = JSON.parse(this.response);
            if (json.status === 1) {
                const div = docQuery(`div[data-tag='${json.updated._id}']`);
                if (div) {
                    const p = div.firstElementChild.firstElementChild;
                    if (theme !== "#fff")
                        p.style.background = theme;
                    if (p.hasAttribute('hidden'))
                        p.removeAttribute('hidden');
                    console.log('Item list updated!');
                    // update members
                    getById('member-' + json.updated._id).textContent = dataList.members.length;
                    getById('checklist-' + json.updated._id).textContent = docQuery('.tcard-checklist-progress > .percent').textContent;
                }
                
                tModalDismiss(id);
            }
        }
    };
    xmlhttp.open("PUT", "/gestion-projet/listitem/" + getById('tmodal-litem-id').value, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("data="+ JSON.stringify(dataList)); 

}

function tFilterItem(source, cardId) {
    const key = source.value;
    const items = [...getById(cardId).children];
    items.forEach(e => {
        if (e.textContent.match(key))
            e.removeAttribute('hidden');
        else e.setAttribute('hidden', '')
    })
}
function tCardCloseFilter(cardId) {
    const items = [...getById(cardId).children];
    items.forEach(e => {
        e.removeAttribute('hidden');
    });
    // hide search field
    getById('filter-' + cardId).setAttribute('hidden', '');
}
function tCardOpenFilter(cardId) {
    // hide search field
    const field = getById('filter-' + cardId);
    field.removeAttribute('hidden');
    field.firstElementChild.focus();
}

function tBoardSearchItem(input, id) {
    var itemFounds = 0;
    [...getById(id).children].forEach(div => {
        div.setAttribute('hidden', '');
        const boardValue = div.querySelector('input').value;
        if (boardValue.toLowerCase().match(input.value.toLowerCase())) {
            div.removeAttribute('hidden');
            itemFounds++;
        }
    });
    input.nextElementSibling.innerHTML = `<b>${itemFounds}</b> élément(s) trouvé(s)`;
}

function tBoardCloseSearchItem(id) {
    const field = getById(id);
    if (!field.hasAttribute('hidden')) {
        // show all board list item (remove hidden)
        [...getById('tboard-list').children].forEach(div => {
            div.removeAttribute('hidden');
        });
        field.setAttribute('hidden', '');
    }
}

function tBoardOpenSearchItem(id) {
    const field = getById(id);
    if (field.hasAttribute('hidden')) {
        field.removeAttribute('hidden');
        const addField = getById('tadd-board-field');
        // hide add field
        if (!addField.hasAttribute('hidden'))
            addField.setAttribute('hidden', '');
    }
}

function tBoardOpenAddItem(id) {
    const field = getById(id);
    if (field.hasAttribute('hidden')) {
        field.removeAttribute('hidden');
        const searchField = getById('search-board-field');
        // hide search field
        if (!searchField.hasAttribute('hidden'))
            searchField.setAttribute('hidden', '');
    }
}
function tBoardCloseAddItem(id) {
    const field = getById(id);
    if (!field.hasAttribute('hidden')) {
        field.setAttribute('hidden', '');
    }
}

function tSetThemeColor(input) {
    getById('tmodal-litem-theme-active').style.background = input.value;
    getById('tmodal-litem-theme-active-name').textContent = input.value;
    getById('tmodal-litem-theme-input').value = input.value;
}

function tShowAvailableMembers(e) {
    const div = docQuery('.tmember-available-list');
    if (div.hasAttribute('hidden')) {
        div.removeAttribute('hidden');
        e.setAttribute('hidden', '');
    }
}