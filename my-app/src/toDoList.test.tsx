import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constant";

jest.mock("./constant", () => ({
    dummyGroceryList: [
      { name: "Apples", isPurchased: false },
      { name: "Bananas", isPurchased: false },
      { name: "Carrots", isPurchased: true },
    ],
  }));
  
  describe("ToDoList Component", () => {
    test("displays all items from the list", () => {
      render(<ToDoList />);
  
      // Check if each item from the dummy grocery list is displayed
      dummyGroceryList.forEach((item) => {
        const element = screen.getByText(item.name);
        expect(element).toBeInTheDocument();
      });
    });

    test("displays correct number of purchased items", () => {
        render(<ToDoList />);
    
        const titleElement = screen.getByTestId("title");
        expect(titleElement).toHaveTextContent("Items bought: 1");
    
        const appleCheckbox = screen.getByRole("checkbox", { name: "Apples" });
        fireEvent.click(appleCheckbox);
        expect(titleElement).toHaveTextContent("Items bought: 2");
    
        const carrotCheckbox = screen.getByRole("checkbox", { name: "Carrots" });
        fireEvent.click(carrotCheckbox);
        expect(titleElement).toHaveTextContent("Items bought: 1");
    
        const bananaCheckbox = screen.getByRole("checkbox", { name: "Bananas" });
        fireEvent.click(bananaCheckbox);
        expect(titleElement).toHaveTextContent("Items bought: 2");
      }); 
  });