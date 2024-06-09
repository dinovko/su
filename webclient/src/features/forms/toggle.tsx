import * as React from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface ToggleButtonsProps {
    onClick(val: string | null): void;
}
export const ToggleButtons: React.FC<ToggleButtonsProps> = ({ onClick }) => {
    const [alignment, setAlignment] = React.useState<string | null>('supply');

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setAlignment(newAlignment);
        onClick(newAlignment)
    };

    return (
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
        >
            <ToggleButton value="supply" aria-label="left aligned">
                Водоснабжение
            </ToggleButton>
            <ToggleButton value="waste" aria-label="centered">
                Водоотведение
            </ToggleButton>
            <ToggleButton value="pipe" aria-label="right aligned" disabled={true}>
                Водопровод
            </ToggleButton>
            <ToggleButton value="preview" aria-label="right aligned">
                Предпросмотр
            </ToggleButton>
            <ToggleButton value="ref_street" aria-label="right aligned">
                Справочник улиц
            </ToggleButton>
        </ToggleButtonGroup>
    );
}