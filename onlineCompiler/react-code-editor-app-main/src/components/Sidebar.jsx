import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, extendTheme, ChakraProvider, Input, Button, Flex } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { LANGUAGE_INFO } from '../constants';
// Extend the default theme
const theme = extendTheme({
    components: {
        Box: {
            baseStyle: {
                userSelect: 'none',
            },
        },
    },
});

const Sidebar = ({ language }) => {
    const [letestselect, setletestselect] = useState("folder1")
    const [selectedLanguage, setSelectedLanguage] = useState(language);
    useEffect(()=>{
        setSelectedLanguage(language);
    },[language])
    console.log(selectedLanguage)
    const [projectStructure, setProjectStructure] = useState([
        {
            id: 'folder1',
            name: 'Project',
            isOpen: true,
            children: [
                {
                    id: 'folder2',
                    name: 'contracts',
                    isOpen: false,
                    children: [
                        { id: 'file2', name: 'contract1.sol', type: 'file' }
                    ]
                },
                { id: 'folder3', name: 'tests', isOpen: false, children: [] },
                { id: 'file1', name: 'README.md', type: 'file' },
            ]
        }
    ]);
    const [addingType, setAddingType] = useState(null); // 'file' or 'folder'
    const [itemName, setItemName] = useState('');
    const [error, setError] = useState('');

    const validExtensions = ['.js', '.sol', '.txt'];

    // Toggle function for folders
    const toggleFolder = (id) => {
        const newStructure = projectStructure.map(item => {
            if (item.id === id) {
                return { ...item, isOpen: !item.isOpen };
            } else if (item.children) {
                return { ...item, children: toggleChildren(item.children, id) };
            }
            return item;
        });

        setProjectStructure(newStructure);
    };
    // Recursive toggle for nested items
    const toggleChildren = (children, id) => {
        return children.map(child => {
            if (child.id === id) {
                return { ...child, isOpen: !child.isOpen };
            } else if (child.children) {
                return { ...child, children: toggleChildren(child.children, id) };
            }
            return child;
        });
    };
    console.log(letestselect)
    // Recursive render function
    const renderItems = (items, parentId = null) => (
        <Droppable droppableId={parentId || 'root'}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    {items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                                <Box
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    p={2}
                                    mb={2}
                                    borderRadius="md"
                                >
                                    <VStack align="start">
                                        <Box display="flex" alignItems="center" cursor="pointer" onClick={() => {
                                            setletestselect(item.id);
                                            item.children && toggleFolder(item.id);
                                        }}>
                                            {item.children ? (
                                                item.isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />
                                            ) : <Text ml="4"></Text>}
                                            <Text ml="2">{item.name}</Text>
                                        </Box>
                                        {item.isOpen && item.children && (
                                            <Box pl={4}>
                                                {renderItems(item.children, item.id)}
                                            </Box>
                                        )}
                                    </VStack>
                                </Box>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );


    function addNodeById(data, idToAdd, newNode) {
        const traverse = (nodes) => {
            for (let node of nodes) {
                if (node.id === idToAdd) {
                    if (!node.children) {
                        node.children = [];
                    }
                    node.children.push(newNode);
                    return true; // Indicate that node was found and updated
                }
                if (node.children && node.children.length > 0) {
                    // Recursively traverse children
                    if (traverse(node.children)) {
                        return true; // If node was found and updated in children, propagate true upwards
                    }
                }
            }
            return false; // Indicate that node was not found in this branch
        };

        if (traverse(data)) {
            return data; // If node was found and updated, return the modified data
        } else {
            // If node was not found, consider adding it at the root level
            data.push(newNode);
            return data;
        }
    }

    const handleAddItem = () => {
        if (!itemName.trim()) {
            setError('Please enter a name.');
            return;
          }
      
          const languageInfo = LANGUAGE_INFO[selectedLanguage];
          if (!languageInfo) {
            setError('Invalid language selected.');
            return;
          }
      
          const { extensions, version } = languageInfo;
      
          if (addingType === 'file' && !extensions.some(ext => itemName.trim().toLowerCase().endsWith(ext))) {
            setError(`Please include a valid file extension for ${selectedLanguage}: ${extensions.join(', ')}`);
            return;
          }
      
          setError(''); // Clear any existing errors
      

        const newItem = {
            id: `${addingType}${Date.now()}`,
            name: itemName.trim(),
            type: addingType,
            ...(addingType === 'folder' ? { isOpen: false, children: [] } : {})
        };

        const newStructure = [...projectStructure];
        const updatedData = addNodeById(newStructure, letestselect, newItem);
        setProjectStructure(updatedData);
        setAddingType(null);
        setItemName('');
    };



    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return; // Dropped outside the list

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return; // Dropped at the same place
        }

        // Helper function to deeply find and remove an item by id, returning the item
        const removeItemById = (nodes, id) => {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === id) {
                    return nodes.splice(i, 1)[0]; // Remove and return the item
                } else if (nodes[i].children) {
                    const found = removeItemById(nodes[i].children, id);
                    if (found) return found;
                }
            }
        };

        // Helper function to insert an item into the specified position in children
        const insertItemInChildren = (nodes, id, item, index) => {
            for (const node of nodes) {
                if (node.id === id) {
                    node.children.splice(index, 0, item);
                    return true;
                } else if (node.children) {
                    if (insertItemInChildren(node.children, id, item, index)) return true;
                }
            }
            return false;
        };

        const newItem = removeItemById([...projectStructure], result.draggableId);

        if (newItem) {
            const success = insertItemInChildren(projectStructure, destination.droppableId, newItem, destination.index);

            if (!success) {
                // If the destination is not found, consider adding it at the root level
                projectStructure.splice(destination.index, 0, newItem);
            }

            setProjectStructure([...projectStructure]); // Update the state
        }
    };


    return (
        <ChakraProvider theme={theme}>
            <Box p={5} w="250px" bg="" border={"1px solid #333"} height="100vh">
                <Text fontSize="lg" fontWeight="bold" mb={4}>
                    Project Structure
                </Text>
                <Flex mb={4} flexDirection={"column"}>
                    <Flex mb={4}>
                        <Button onClick={() => setAddingType('file')} mr={2}>Add File</Button>
                        <Button onClick={() => setAddingType('folder')} mr={2}>Add Folder</Button>
                    </Flex>
                    {addingType && (
                        <>
                            <Input
                                placeholder={`Enter ${addingType} name`}
                                value={itemName}
                                onChange={(e) => {
                                    setItemName(e.target.value);
                                    setError(''); // Clear error when the user starts to type
                                }}
                                isInvalid={!!error}
                            />
                            {error && <Text color="red.500" fontSize="sm">{error}</Text>}
                        </>
                    )}
                    {addingType && (
                        <Button onClick={handleAddItem} ml={2} display={'inline-block'} mt={3}>Add</Button>
                    )}
                </Flex>
                <DragDropContext onDragEnd={onDragEnd}>
                    {renderItems(projectStructure)}
                </DragDropContext>
            </Box>
        </ChakraProvider>
    );
};

export default Sidebar;
