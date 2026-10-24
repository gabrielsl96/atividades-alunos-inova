using System;

namespace jogo_da_adivinhação;

public class Program
{
    public static void Main()
    {
        Console.WriteLine("Bem-vindo ao jogo de adivinhação!\n");
        Console.WriteLine("descubra o número secreto!\n");

        Random random = new Random();
        int numeroSecreto = random.Next(1, 101);

        int tentativas = 0;
        int palpite = 0;

        while (palpite != numeroSecreto)
        {
            Console.Write("Digite seu palpite (1 a 100): ");
            string entrada = Console.ReadLine();
            if (!int.TryParse(entrada, out palpite))
            {
                Console.WriteLine("Por favor, digite um número válido.");
                continue;
            }
            tentativas++;
            if (palpite < numeroSecreto)
            {
                Console.WriteLine("Muito baixo! Tente novamente.\n");
            }
            else if (palpite > numeroSecreto)
            {
                Console.WriteLine("Muito alto! Tente novamente.\n");
            }
        }
        Console.WriteLine($"Parabéns! Você acertou o número secreto em {tentativas} tentativas.");

    }
}