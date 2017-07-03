// JavaScript Document

function load(m){
    m=m||"home"
    router(m,$("#tabcontainer"))
}
load("home")
$(function(){
    $("#home").click(function(){
        load("home")
    })
    $("#songlist").click(function(){
        load("songlist")
    })
    $("#order").click(function(){
        load("order")
    })
    $("#singer").click(function(){
        load("singer")
    })
})