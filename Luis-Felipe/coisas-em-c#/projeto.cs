using System;

namespace aula1;

public class Program
{
    public static void Main()
    {
        Console.WriteLine("\t\t===Cine Ticket System===\n\t\t(10 dollars for each ticket)\n");
        Console.Write("Enter your name: ");
        string userName = Console.ReadLine();

        Console.Write("Enter how many different films you want to watch: ");
        int numberOfFilms = Convert.ToInt32(Console.ReadLine());

        
        string[] filmNames = new string[numberOfFilms];
        int[] ticketsPerFilm = new int[numberOfFilms];

        Console.Clear();


        for (int i = 0; i < numberOfFilms; i++)
        {
            Console.WriteLine($"\n--- Film #{i + 1} ---");

            Console.Write("Enter the film name: ");
            filmNames[i] = Console.ReadLine();

            Console.Write("Enter the number of tickets you want to purchase for this film: ");
            ticketsPerFilm[i] = Convert.ToInt32(Console.ReadLine());
        }
 
       
        int ticketPrice = 10;
        int totalTicketsAllFilms = 0;
        int totalPrice = 0;

        Console.WriteLine($"\n========================================");
        Console.WriteLine($"Hello {userName}, here is your purchase summary:");
        Console.WriteLine($"========================================\n");

        
        for (int i = 0; i < numberOfFilms; i++)
        {
            int costForThisFilm = ticketsPerFilm[i] * ticketPrice;
            totalPrice += costForThisFilm;
            totalTicketsAllFilms += ticketsPerFilm[i];

            Console.WriteLine($"- Film: '{filmNames[i]}' | Tickets: {ticketsPerFilm[i]} | Subtotal: ${costForThisFilm}\n");
        }

        Console.WriteLine($"----------------------------------------");
        Console.WriteLine($"Total Tickets Purchased: {totalTicketsAllFilms}");
        Console.WriteLine($"Total Price to Pay: ${totalPrice}");
        Console.WriteLine($"========================================");
    }
}
