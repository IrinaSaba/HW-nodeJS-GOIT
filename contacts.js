const path = require("path");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function readFiles() {
  return fs.readFile(contactsPath, "utf-8");
}

async function listContacts() {
  try {
    const data = await readFiles();
    const result = JSON.parse(data);
    console.table(result);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await readFiles();
    const contactById = JSON.parse(data).find(
      (el) => el.id === String(contactId)
    );
    console.log("contactById", contactById);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await readFiles();
    const contacts = JSON.parse(data).filter(
      (el) => el.id !== String(contactId)
    );
    const dataNew = await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await readFiles();
    let contactsAll = JSON.parse(data);
    contactsAll.push({
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    });

    const dataAll = await fs.writeFile(
      contactsPath,
      JSON.stringify(contactsAll)
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
