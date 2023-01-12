var STORAGE_KEY = 'todo-vuejs-demo'
var todoStorage = {
    fetch: function() {
        var todos = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        )
        todos.forEach(function(todo, index) {
            todo.id = index;
        })
        todoStorage.uid = todos.length
        return todos
    },
    save: function(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}

new Vue ({
    el: '#app',
    data: {
        todos: [
            { id: 1, comment: 'タスク1', state: 0},
            { id: 2, comment: 'タスク2', state: 0},
            { id: 3, comment: 'タスク3', state: 0}
        ]
    },
    methods: {
        doAdd: function(event, value) {
            var comment = this.$refs.comment;

            if (comment.value.length == 0) {
                return;
            }

            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            })

            comment.value = '';
        },
        doDelete: function(item){
            var index = this.todos.indexOf(item);
            this.todos.splice(index, 1);
        },
        doChangeState: function(item){
            item.state = item.state == 0 ? 1 : 0;
        }
    },
    watch: {
        todos: {
            handler: function(todos) {
                todoStorage.save(todos)
            },
            deep: true
        }
    },
    created(){
        this.todos = todoStorage.fetch();
    }
});