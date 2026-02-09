'use client'

import * as React from 'react'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined'
import { RichTreeView } from '@mui/x-tree-view/RichTreeView'
import { useTreeItem } from '@mui/x-tree-view/useTreeItem'
import {
  TreeItemContent,
  TreeItemLabel,
  TreeItemRoot,
  TreeItemProps,
  TreeItemGroupTransition
} from '@mui/x-tree-view/TreeItem'
import { TreeItemProvider } from '@mui/x-tree-view/TreeItemProvider'
import { TreeItemDragAndDropOverlay } from '@mui/x-tree-view/TreeItemDragAndDropOverlay'
import { useTreeItemUtils } from '@mui/x-tree-view/hooks'

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  { id, itemId, label, disabled, children }: TreeItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  const {
    getRootProps,
    getContentProps,
    getLabelProps,
    getGroupTransitionProps,
    getDragAndDropOverlayProps,
    getContextProviderProps,
    status
  } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref })

  const { interactions } = useTreeItemUtils({
    itemId,
    children
  })

  const handleClick = (event: React.MouseEvent) => {
    interactions.handleExpansion(event)
  }

  return (
    <TreeItemProvider {...getContextProviderProps()}>
      <TreeItemRoot {...getRootProps({ sx: { position: 'relative', marginBottom: '12px' } })}>
        {status.expandable && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexGrow: 1,
              width: '24px',
              height: 'calc(100% - 12px)',
              position: 'absolute',
              left: '-24px',
              top: '6px'
            }}
          >
            {status.expanded ? (
              <React.Fragment>
                <IconButton onClick={handleClick} aria-label='collapse item' size='small'>
                  <IndeterminateCheckBoxOutlinedIcon sx={{ fontSize: '14px' }} />
                </IconButton>
                <Box sx={{ flexGrow: 1, borderLeft: '1px solid' }} />
              </React.Fragment>
            ) : (
              <IconButton onClick={handleClick} aria-label='Expand item' size='small'>
                <AddBoxOutlinedIcon sx={{ fontSize: '14px' }} />
              </IconButton>
            )}
          </Box>
        )}

        <TreeItemContent
          sx={{
            padding: '12px 16px',
            backgroundColor: '#f4f4f9',
            borderRadius: '8px',
            border: '1px solid #ddd',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#e3f2fd'
            }
          }}
          {...getContentProps()}
        >
          <TreeItemLabel {...getLabelProps()} />

          <TreeItemDragAndDropOverlay {...getDragAndDropOverlayProps()} />
        </TreeItemContent>
        {children && (
          <TreeItemGroupTransition
            sx={{
              marginLeft: '20px',
              marginTop: '12px',
              marginBottom: '5px'
            }}
            {...getGroupTransitionProps()}
          />
        )}
      </TreeItemRoot>
    </TreeItemProvider>
  )
})

export default function HandleExpansionDemo({ data }: any) {
  return (
    <Box sx={{ minHeight: 200, minWidth: 350 }}>
      <RichTreeView
        items={data}
        defaultExpandedItems={['grid']}
        slots={{ item: CustomTreeItem }}
        getItemLabel={(item: any) => item.label || item.name}
      />
    </Box>
  )
}
