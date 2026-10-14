using System;

int i,age;
string name;

Console.WriteLine ("\t\t=== cine tickets system ===\n\n");
    
Console.Write ("Enter your age: ");
String input = Console.ReadLine();
age = int.Parse (input);

Console.Write ("enter your name: ");
name = Console.ReadLine();

if(age< 18 ){

    Console.WriteLine($"\n{name}, your a kid. you cant enter");
}
else{
    Console.WriteLine($"\n{name}, what film do you want to watch?\n");

    Console.Write ("Type 1 to watch street fighter or type 2 to watch The Odyssey: ");
input = Console.ReadLine();
i = int.Parse (input);
    if(i==1){
Console.Write("\n\nHave a good time wathing street fighter! :)");       
}
    if (i==2){
        Console.Write("\n\nHave a good time wathing The Odyssey!  :)");  
    }

    if (i!=1&&i!=2){
        Console.Write("\n\nYou type a invalid number try again");
    }
}