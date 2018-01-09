

// $(document).ready(function(){
        
//     // console.log('hey');
//     $.getJSON('/api/todos')
//         .then(addTodos)

    
// });



fetch('/api/todos')
    .then( function(todos){
        
        todos.json().then(function(res){
           
            addTodos(res);

            $('#todoInput').keypress(function(event){
                
                if(event.which == 13){
                    createTodo();
                }
                
            });
            
        });

    });

  

    function createTodo(){
        let userInput = $('#todoInput').val();
        console.log(userInput);
        
        $.post('/api/todos', {name: userInput})
            .then(function(newTodo){
                console.log(newTodo);
                render(newTodo)
            })
            .catch(function(err){
                console.log(err);
            }) 
    }

function addTodos(todos){
    
    todos.forEach(function(todo, index) {

        render(todo, index)

    })

}

function render(todo, index){

    let newTodo = `<tr><th scope="row">${index}</th><td> ${todo.name} <span>X</span> </td></tr>`;
    // $('.list').append(newTodo);
    if(todo.complete){
        newTodo = `<tr class="done"><th scope="row" >${index}</th><td> ${todo.name} <span>X</span> </td></tr>`;
    } 
    const table = document.querySelector('.list');
    table.innerHTML += newTodo;

}




$(document).ready(function(){
        
    $('.list').on('click', 'span', function(){
        console.log('clicked');
        $(this).parents('tr').remove();
        
    });

});
