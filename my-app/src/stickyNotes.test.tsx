import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("Create StickyNote", () => {
  // Test to check if the form is rendered properly
  test("renders create note form", () => {
    render(<StickyNotes />);
    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  // Test to simulate creating a new note
  test("creates a new note", () => {
    render(<StickyNotes />);

    // Locate title and content inputs using their placeholders
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    // Simulate user entering data in the form fields
    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Note content" } });

    // Simulate clicking the Create Note button
    fireEvent.click(createNoteButton);

    // Check if the new note is now visible in the document
    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });

  test("delete a note", () => {
    render(<StickyNotes />);
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "Note to Delete" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Content to Delete" } });
    fireEvent.click(createNoteButton);

    // Delete the note
    const deleteButtons = screen.getAllByText("🗑️");
    fireEvent.click(deleteButtons[0]); //need to delete the first note

    expect(screen.queryByText("Note to Delete")).not.toBeInTheDocument();
    expect(screen.queryByText("Content to Delete")).not.toBeInTheDocument();
  })
  test("update a note", ()=> {
    render(<StickyNotes />);
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note")

    fireEvent.change(createNoteTitleInput, { target: { value: "Note to update" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Content to update" } });
    fireEvent.click(createNoteButton);

    const updateButtons = screen.getAllByText("✏️");
    fireEvent.click(updateButtons[0]);
    
    const editTitleInput = screen.getByText("Note to update");
    const editContentTextarea = screen.getByText("Content to update");
 
    fireEvent.input(editTitleInput, { target: { value: "Updated Note" } });
    fireEvent.blur(editTitleInput);

    fireEvent.input(editContentTextarea, { target: { value: "Updated Content" } });
    fireEvent.blur(editContentTextarea);

    expect(screen.queryByText("Note to update")).not.toBeInTheDocument();
    expect(screen.queryByText("Content to update")).not.toBeInTheDocument();
  })

  test("Read: Are all the notes that are created displayed on the page", () => {
    render(<StickyNotes />);
  
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");
  
    // Create the first note
    fireEvent.change(createNoteTitleInput, { target: { value: "Note 1" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Content 1" } });
    fireEvent.click(createNoteButton);
  
    // Create the second note
    fireEvent.change(createNoteTitleInput, { target: { value: "Note 2" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Content 2" } });
    fireEvent.click(createNoteButton);
  
    // Create the third note
    fireEvent.change(createNoteTitleInput, { target: { value: "Note 3" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Content 3" } });
    fireEvent.click(createNoteButton);
  
    // Verify that all notes are displayed with their titles and contents
    expect(screen.getByText("Note 1")).toBeInTheDocument();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  
    expect(screen.getByText("Note 2")).toBeInTheDocument();
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  
    expect(screen.getByText("Note 3")).toBeInTheDocument();
    expect(screen.getByText("Content 3")).toBeInTheDocument();
  });
});
